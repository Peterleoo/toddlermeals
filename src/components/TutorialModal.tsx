import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isLoading: boolean;
}

export default function TutorialModal({ isOpen, onClose, title, content, isLoading }: TutorialModalProps) {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  const handlePlayAudio = () => {
    if (isPlaying) {
      // 停止播放
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    // 检查 speechSynthesis API 是否可用
    if (!window.speechSynthesis) {
      alert('您的浏览器不支持语音朗读功能');
      return;
    }

    setIsLoadingAudio(true);
    try {
      // 简化内容，只朗读关键部分
      const cleanContent = content.replace(/#|\*|\n/g, ' ').substring(0, 2000); // 限制长度
      const utterance = new SpeechSynthesisUtterance(cleanContent);
      utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoadingAudio(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsLoadingAudio(false);
        setIsPlaying(false);
        alert('语音朗读失败，请重试');
      };

      // 等待语音合成服务准备就绪
      const speak = () => {
        if (window.speechSynthesis.speaking) {
          setTimeout(speak, 100);
        } else {
          window.speechSynthesis.speak(utterance);
        }
      };

      speak();
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setIsLoadingAudio(false);
      setIsPlaying(false);
      alert('语音朗读失败，请重试');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-95"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          
          <button
            onClick={handlePlayAudio}
            disabled={isLoadingAudio}
            className="flex items-center space-x-2 bg-[#007AFF]/10 text-[#007AFF] px-4 py-2.5 rounded-full font-medium hover:bg-[#007AFF]/20 transition-colors disabled:opacity-50 active:scale-95 w-fit self-start"
          >
            {isLoadingAudio ? (
              <div className="w-5 h-5 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
            <span>{isPlaying ? t('stopAudio') : t('playAudio')}</span>
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">{t('generatingRecipe')}</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}