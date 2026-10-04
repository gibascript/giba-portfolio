import { LocaleProvider } from '@/context/locale/locale-provider';
import { WorkbenchProvider } from '@/context/workbench/workbench-provider';
import About from '@/features/about/about';
import AppStatus from '@/features/app-status/app-status';
import Certifications from '@/features/certifications/certifications';
import CommandPalette from '@/features/command-palette/command-palette';
import Contact from '@/features/contact/contact';
import Education from '@/features/education/education';
import Experience from '@/features/experience/experience';
import Hero from '@/features/hero/hero';
import Projects from '@/features/projects/projects';
import Stack from '@/features/stack/stack';
import Testimonials from '@/features/testimonials/testimonials';
import Stage from '@/features/stage/stage';
import Workbench from '@/features/workbench/workbench';

/**
 * The portfolio: the hero, with the workbench rising over it (every section a
 * file), above the status bar; the command palette opens over everything.
 */
export default function App() {
  return (
    <LocaleProvider>
      <WorkbenchProvider>
        <div className="flex h-full flex-col">
          <Stage
            heroScreen={<Hero />}
            workbenchScreen={
              <Workbench
                files={{
                  about: About,
                  experience: Experience,
                  projects: Projects,
                  certifications: Certifications,
                  stack: Stack,
                  education: Education,
                  testimonials: Testimonials,
                  contact: Contact,
                }}
              />
            }
          />
          <AppStatus />
        </div>
        <CommandPalette />
      </WorkbenchProvider>
    </LocaleProvider>
  );
}
