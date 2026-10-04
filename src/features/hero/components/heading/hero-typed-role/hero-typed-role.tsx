import { mediaQueries } from '@/constants/media-queries';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTypewriter } from './hooks/use-typewriter';

type HeroTypedRoleProps = {
  roles: readonly string[];
};

/**
 * The roles typed one after the other, with a blinking cursor. Screen readers
 * get the first role only, as the typing would read letter by letter; with
 * reduced motion, that role shows whole, without animation.
 */
export function HeroTypedRole({ roles }: HeroTypedRoleProps) {
  const reducedMotion = useMediaQuery(mediaQueries.reducedMotion);
  const typed = useTypewriter(roles, !reducedMotion);

  return (
    <>
      <span className="sr-only">{roles[0]}</span>
      <span aria-hidden>
        {typed}
        <span className="typing-cursor" />
      </span>
    </>
  );
}
