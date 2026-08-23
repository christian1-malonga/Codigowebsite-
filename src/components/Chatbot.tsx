import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Send, X } from 'lucide-react';

const quickReplies = ['What do you build?', 'How do you work?', 'Request an estimate'];

type ChatMessage = { from: 'bot' | 'user'; text: string };
type LookVector = { x: number; y: number };

function getReply(message: string) {
  const text = message.toLowerCase();
  if (text.includes('build') || text.includes('service') || text.includes('capabil')) {
    return 'We build mobile apps, web products, AI workflows, and clear product interfaces — from discovery through launch and ongoing care.';
  }
  if (text.includes('work') || text.includes('process') || text.includes('how')) {
    return 'We start with discovery, shape the interface, build in focused sprints, then launch and stay close after release.';
  }
  if (text.includes('estimate') || text.includes('price') || text.includes('cost')) {
    return 'Tell us what you want to build and our team can prepare a clear estimate. You can start with the contact form.';
  }
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return 'Hello. I’m Codigo’s little helper. What would you like to explore?';
  }
  return 'Thanks for reaching out. A member of the Codigo team can help with that. Try the contact form and we’ll get back to you within one business day.';
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [closeMood, setCloseMood] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: 'bot', text: 'Hi — I’m Codigo’s little helper. How can I point you in the right direction?' }]);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);
  const lookTarget = useRef<LookVector>({ x: 0, y: 0 });
  const lookCurrent = useRef<LookVector>({ x: 0, y: 0 });
  const activityTimer = useRef<number | null>(null);
  const moodTimer = useRef<number | null>(null);
  const blinkTimer = useRef<number | null>(null);
  const blinkOpenTimer = useRef<number | null>(null);
  const lookFrame = useRef<number | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    let cancelled = false;
    const scheduleBlink = () => {
      blinkTimer.current = window.setTimeout(() => {
        if (cancelled) return;
        setBlinking(true);
        blinkOpenTimer.current = window.setTimeout(() => {
          if (cancelled) return;
          setBlinking(false);
          scheduleBlink();
        }, 205 + Math.random() * 45);
      }, 2600 + Math.random() * 2800);
    };
    scheduleBlink();
    return () => {
      cancelled = true;
      if (blinkTimer.current !== null) window.clearTimeout(blinkTimer.current);
      if (blinkOpenTimer.current !== null) window.clearTimeout(blinkOpenTimer.current);
    };
  }, []);

  useEffect(() => {
    const animateLook = () => {
      const current = lookCurrent.current;
      const target = lookTarget.current;
      current.x += (target.x - current.x) * 0.48;
      current.y += (target.y - current.y) * 0.48;
      const orb = orbRef.current;
      if (orb) {
        orb.style.setProperty('--gaze-x', `${(current.x * 1.8).toFixed(2)}px`);
        orb.style.setProperty('--gaze-y', `${(current.y * 1.8).toFixed(2)}px`);
        orb.style.setProperty('--pupil-x', `${(current.x * 5.2).toFixed(2)}px`);
        orb.style.setProperty('--pupil-y', `${(current.y * 4.8).toFixed(2)}px`);
        orb.style.setProperty('--head-x', `${(current.x * 3).toFixed(2)}px`);
        orb.style.setProperty('--head-y', `${(current.y * 2).toFixed(2)}px`);
        orb.style.setProperty('--head-tilt', `${(current.x * 7).toFixed(2)}deg`);
      }
      lookFrame.current = window.requestAnimationFrame(animateLook);
    };
    lookFrame.current = window.requestAnimationFrame(animateLook);
    return () => {
      if (lookFrame.current !== null) window.cancelAnimationFrame(lookFrame.current);
    };
  }, []);

  useEffect(() => {
    const markActivity = () => {
      setTracking(true);
      if (activityTimer.current !== null) window.clearTimeout(activityTimer.current);
      activityTimer.current = window.setTimeout(() => setTracking(false), 1100);
    };
    const updateLook = (clientX: number, clientY: number) => {
      lookTarget.current = {
        x: Math.max(-1, Math.min(1, clientX / Math.max(window.innerWidth, 1) * 2 - 1)),
        y: Math.max(-1, Math.min(1, clientY / Math.max(window.innerHeight, 1) * 2 - 1)),
      };
      markActivity();
    };
    const followPointer = (event: PointerEvent) => updateLook(event.clientX, event.clientY);
    const followTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updateLook(touch.clientX, touch.clientY);
    };
    const onScroll = () => markActivity();
    window.addEventListener('pointermove', followPointer, { passive: true });
    window.addEventListener('touchmove', followTouch, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', followPointer);
      window.removeEventListener('touchmove', followTouch);
      window.removeEventListener('scroll', onScroll);
      if (activityTimer.current !== null) window.clearTimeout(activityTimer.current);
    };
  }, []);

  const closeChat = () => {
    setOpen(false);
    setTracking(false);
    setCloseMood(true);
    if (moodTimer.current !== null) window.clearTimeout(moodTimer.current);
    moodTimer.current = window.setTimeout(() => setCloseMood(false), 4800);
  };

  const toggleChat = () => {
    if (open) closeChat();
    else {
      setCloseMood(false);
      setOpen(true);
    }
  };

  const sendMessage = (event?: FormEvent<HTMLFormElement>, preset?: string) => {
    event?.preventDefault();
    const text = (preset ?? draft).trim();
    if (!text) return;
    setMessages(current => [...current, { from: 'user', text }, { from: 'bot', text: getReply(text) }]);
    setDraft('');
  };

  return <div className={`chatbot ${open ? 'chatbot--open' : ''} ${tracking ? 'chatbot--tracking' : ''} ${closeMood ? 'chatbot--closing' : ''} ${blinking ? 'chatbot--blinking' : ''}`}>
    {open && <section className="chatbot-panel" aria-label="Codigo chat assistant">
      <div className="chatbot-panel__head">
        <div><span className="chatbot-panel__eyebrow">CODIGO ASSISTANT</span><strong>How can we help?</strong></div>
        <button className="chatbot-close" type="button" aria-label="Close chat" onClick={closeChat}><X size={18} /></button>
      </div>
      <div className="chatbot-messages" aria-live="polite">
        {messages.map((message, index) => <div className={`chatbot-message chatbot-message--${message.from}`} key={`${message.from}-${index}`}>{message.text}</div>)}
      </div>
      <div className="chatbot-quick-replies">{quickReplies.map(reply => <button type="button" key={reply} onClick={() => sendMessage(undefined, reply)}>{reply}</button>)}</div>
      <form className="chatbot-form" onSubmit={sendMessage}><input ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} placeholder="Write a message..." aria-label="Message" /><button type="submit" aria-label="Send message"><Send size={16} /></button></form>
      <a className="chatbot-contact-link" href="/contacts" onClick={() => setOpen(false)}>Talk to the team <ArrowUpRight size={13} /></a>
    </section>}
    {closeMood && <div className="chatbot-reaction" role="status">I want us to talk again.</div>}
    <button className="chatbot-trigger" type="button" aria-label={open ? 'Close Codigo assistant' : 'Open Codigo assistant'} aria-expanded={open} onClick={toggleChat}>
      <span className="chatbot-floor" aria-hidden="true" /><span ref={orbRef} className="chatbot-orb" aria-hidden="true"><svg className="chatbot-face-art" viewBox="0 0 82 82" focusable="false"><ellipse className="chatbot-eye-shape" cx="28" cy="32" rx="8" ry="10" /><ellipse className="chatbot-eye-shape" cx="54" cy="32" rx="8" ry="10" /><g className="chatbot-pupil chatbot-pupil--left"><circle cx="28" cy="33" r="3.8" /><circle className="chatbot-pupil-glint" cx="29.4" cy="31.5" r="1.15" /></g><g className="chatbot-pupil chatbot-pupil--right"><circle cx="54" cy="33" r="3.8" /><circle className="chatbot-pupil-glint" cx="55.4" cy="31.5" r="1.15" /></g><path className="chatbot-lid chatbot-lid--left" d="M20 32 Q28 38 36 32" /><path className="chatbot-lid chatbot-lid--right" d="M46 32 Q54 38 62 32" /><ellipse className="chatbot-cheek-shape" cx="16" cy="55" rx="7" ry="4" /><ellipse className="chatbot-cheek-shape" cx="66" cy="55" rx="7" ry="4" /><path className="chatbot-dimple-shape" d="M23 50 q-2 2 -3 4" /><path className="chatbot-dimple-shape" d="M59 50 q2 2 3 4" /><path className="chatbot-mouth-smile" d="M30 53 Q41 64 52 53" /><path className="chatbot-mouth-open" d="M29 52 Q41 59 53 52 L51 63 Q41 70 31 63 Z" /><path className="chatbot-mouth-tongue" d="M35 63 Q41 58 47 63 Q45 67 41 67 Q37 67 35 63 Z" /><path className="chatbot-mouth-teeth" d="M33 53 Q41 56 49 53 L49 59 L33 59 Z" /><path className="chatbot-tear-shape chatbot-tear-shape--left" d="M25 47 C22 52 22 56 25 58 C28 56 28 52 25 47 Z" /><path className="chatbot-tear-shape chatbot-tear-shape--right" d="M57 47 C54 52 54 56 57 58 C60 56 60 52 57 47 Z" /></svg></span>
      <span className="chatbot-trigger__label">Chat with us</span>
      <MessageCircle size={15} className="chatbot-trigger__icon" aria-hidden="true" />
    </button>
  </div>;
}
