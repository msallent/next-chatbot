import { LinkButton } from '@/components/LinkButton';

const pageToURL: Record<ChatHeaderProps['page'], { url: string; label: string }> = {
  chat: { url: '/chat-history', label: 'Chat History' },
  history: { url: '/chat', label: 'Go to Chat' },
};

type ChatHeaderProps = {
  page: 'chat' | 'history';
};

export function ChatHeader({ page }: ChatHeaderProps) {
  return (
    <header className="h-8 w-full flex items-center justify-end">
      <LinkButton size="small" href={pageToURL[page].url}>
        {pageToURL[page].label}
      </LinkButton>
    </header>
  );
}
