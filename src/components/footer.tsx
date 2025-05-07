export function Footer() {
  return (
    <div className="w-full flex justify-center items-center p-6 mb-6 text-muted-foreground">
      Made with{" "}
      <a
        href="https://github.com/mxfng/talamak"
        className="text-primary hover:underline pl-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Talamak
      </a>
      .
    </div>
  );
}
