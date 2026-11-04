import type { AnchorHTMLAttributes } from "react";

type InteractiveHoverButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  text: string;
  /** Glyph shown on hover. It states where the link goes, so it varies per link. */
  icon?: string;
  variant?: "primary" | "secondary";
};

// Port of the 21st.dev Interactive Hover Button as a link. The reveal layer repeats the
// label for sighted users only, so the accessible name is read once.
export function InteractiveHoverButton({
  text,
  icon = "→",
  variant = "primary",
  className,
  children,
  ...anchorProps
}: InteractiveHoverButtonProps) {
  const classes = ["hover-button", `hover-button--${variant}`, className].filter(Boolean).join(" ");
  return (
    <a className={classes} {...anchorProps}>
      <span className="hover-button-label">{text}</span>
      <span className="hover-button-reveal" aria-hidden="true">
        {text}
        <span>{icon}</span>
      </span>
      <span className="hover-button-dot" aria-hidden="true" />
      {children}
    </a>
  );
}
