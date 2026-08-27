import { Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-ai-ready',
  imports: [CodeBlock, DocPager],
  templateUrl: './ai-ready.html',
  styleUrl: './ai-ready.scss',
})
export class AiReady {
  protected readonly installSkillsNpx = `npx skills add https://github.com/im4aLL/roolith-ng/skills --skill roolith-ng`;

  protected readonly manualCopy = `cp -R node_modules/@im4all/roolith-ng/skills/roolith-ng .pi/skills/
cp -R node_modules/@im4all/roolith-ng/skills/roolith-ng .opencode/skills/
cp -R node_modules/@im4all/roolith-ng/skills/roolith-ng .agents/skills/`;

  protected readonly verifySkill = `ls .pi/skills/roolith-ng/SKILL.md
ls .opencode/skills/roolith-ng/SKILL.md
ls .agents/skills/roolith-ng/SKILL.md
ls skills/roolith-ng/references/button.md`;

  protected readonly uninstallSkill = `rm -rf .pi/skills/roolith-ng .opencode/skills/roolith-ng .agents/skills/roolith-ng .claude/skills/roolith-ng .cursor/skills/roolith-ng`;

  protected readonly agentPrompt = `Add a roolith-ng button with icon to the header.

Use roolith-ng skill - import from '@im4all/roolith-ng' and use rng- selectors.`;

  protected readonly usageSnippet = `import { Component, signal } from '@angular/core';
import { ButtonComponent, CardComponent } from '@im4all/roolith-ng';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, CardComponent],
  template: \`
    <rng-card header="Hello Roolith">
      <rng-button variant="primary">Get started</rng-button>
    </rng-card>
  \`,
})
export class ExampleComponent {
  protected readonly count = signal(0);
}`;
}
