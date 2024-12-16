import { useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const PolicyModal = ({ isOpen, onClose, title, content }: PolicyModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      showModal();
    } else if (modalRef.current) {
      hideModal();
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const showModal = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => { isAnimatingRef.current = false; }
    });

    if (modalRef.current && backdropRef.current && headerRef.current && contentRef.current?.children) {
      gsap.set([modalRef.current, backdropRef.current, headerRef.current, contentRef.current.children], { 
        opacity: 0,
        y: 20 
      });

      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
      })
      .to(modalRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.2')
      .to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, '-=0.3')
      .to(contentRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
      }, '-=0.2');
    }
  };

  const hideModal = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => { isAnimatingRef.current = false; }
    });

    if (modalRef.current && backdropRef.current && headerRef.current && contentRef.current?.children) {
      tl.to(contentRef.current.children, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.02,
      })
      .to(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
      }, '-=0.2')
      .to(modalRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
      }, '-=0.2')
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
      }, '-=0.1');
    }
  };

  const formattedContent = useMemo(() => {
    return content.split('\n').map((line: string, index: number) => {
      if (line.startsWith('# ')) {
        return (
          <h2 key={index} className="text-2xl font-light mt-8 mb-4 text-light-text-primary dark:text-dark-text-heading">
            {line.replace('# ', '').trim()}
          </h2>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-xl font-light mt-6 mb-3 text-light-text-primary dark:text-dark-text-heading">
            {line.replace('## ', '').trim()}
          </h3>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg font-light mt-4 mb-2 text-light-text-primary dark:text-dark-text-heading">
            {line.replace('### ', '').trim()}
          </h4>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={index} className="ml-6 my-1 text-light-text-secondary dark:text-dark-text-secondary">
            {line.replace(/^[-*] /, '').trim()}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      return (
        <p key={index} className="my-2 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          {line}
        </p>
      );
    });
  }, [content]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-light-bg-primary/80 dark:bg-dark-bg-primary/80 backdrop-blur-sm z-40"
      />
      <div
        ref={modalRef}
        className="fixed inset-4 sm:inset-auto sm:top-[10%] sm:left-1/2 sm:-translate-x-1/2 sm:max-w-3xl w-full 
          max-h-[80vh] bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl shadow-xl z-50 flex flex-col"
      >
        <div 
          ref={headerRef}
          className="flex items-center justify-between px-6 py-4 border-b border-light-text-primary/10 dark:border-dark-text-primary/10"
        >
          <h2 className="text-xl font-light text-light-text-primary dark:text-dark-text-heading">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div ref={contentRef} className="max-w-none prose dark:prose-invert">
            {formattedContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyModal;