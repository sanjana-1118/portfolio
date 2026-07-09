interface SectionHeaderProps {
  subtitle: string;
  title: string;
  className?: string;
}

export const SectionHeader = ({ subtitle, title, className = "mb-12" }: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2 text-accent font-semibold tracking-widest text-[11px] uppercase mb-4">
        <span className="w-1.5 h-1.5 rounded-none bg-accent shrink-0"></span>
        {subtitle}
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground font-serif">
        {title}
      </h2>
    </div>
  );
};
