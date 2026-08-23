import type { ComponentType, ReactNode } from 'react';
import { Brain, Cloud, Database, LayoutGrid, PenTool, Server, Smartphone, type LucideProps } from 'lucide-react';

const brushAsset = '/brush.png';

type IconProps = { size?: number; className?: string };
const svgProps = { fill: 'none', stroke: '#E8471A', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const stackIcons: Record<string, ComponentType<LucideProps>> = { smartphone: Smartphone, grid: LayoutGrid, server: Server, database: Database, cloud: Cloud, brain: Brain, pen: PenTool };

export function StackIcon({ name }: { name: string }) { const Icon = stackIcons[name] ?? Smartphone; return <Icon aria-hidden="true" width={18} height={18} size={18} strokeWidth={2} style={{ marginRight: 8 }} />; }

export function LineIcon({ name, size = 40, className = '' }: { name: string } & IconProps) {
  if (name === 'brush') return <img className={className} src={brushAsset} alt="" width={size} height={size} />;
  const content: Record<string, ReactNode> = {
    phone: <><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M10 18h4" /></>,
    monitor: <><rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M2.5 8h19M8 21h8M12 17v4" /></>,
    chip: <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /><path d="M11 8v6M8 11h6" /></>,
    shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2.5 2.5L16 10" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className} {...svgProps}>{content[name] ?? content.phone}</svg>;
}
