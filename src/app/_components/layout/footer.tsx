import React from 'react'

export const Footer = () => {
  return (
    <footer className="py-6 px-6 md:px-10 lg:px-16 border-t border-border/50 mt-auto">
      <div className="max-w-screen-xl mx-auto text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MechanicFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}
