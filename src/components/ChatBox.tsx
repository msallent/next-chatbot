import { ChangeEvent } from 'react';
import TextArea from 'react-textarea-autosize';
import SpinnerSVG from '@/assets/spinner.svg';
import SendSVG from '@/assets/send.svg';

type ChatBoxProps = {
  message: string;
  isLoading: boolean;
  onSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
  onChange: (value: string) => void;
};

export function ChatBox({ message, isLoading, onChange, onSubmit }: ChatBoxProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex items-center justify-between gap-4 p-4 border rounded-md border-neutral-800 bg-neutral-950"
    >
      {isLoading ? (
        <SpinnerSVG className="w-6 h-6 text-gray-600 animate-spin fill-[#00BF6F]" />
      ) : (
        <TextArea
          autoFocus
          minRows={1}
          maxRows={3}
          name="message"
          value={message}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Say something..."
          className="grow bg-transparent resize-none outline-none placeholder:text-white/35"
        />
      )}
      <button disabled={isLoading || message.length === 0} className="[&>svg]:disabled:opacity-35">
        <SendSVG aria-hidden="true" className="w-6 h-6 fill-white" />
        <span className="sr-only">Submit</span>
      </button>
    </form>
  );
}
