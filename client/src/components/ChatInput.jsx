import React, { useRef, useEffect } from "react";

const ChatInput = React.memo(({ text, setText, sendMessage }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // keep focus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <div className="px-4">
      <div className="flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 outline-none text-slate-700"
          onKeyDown={e => e.key === "Enter" && sendMessage(inputRef)}
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="type a message..."
        />
      </div>
    </div>
  );
});

export default ChatInput;
