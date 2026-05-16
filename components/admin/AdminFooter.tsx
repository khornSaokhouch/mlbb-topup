import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="py-8 px-8 border-t border-foreground/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="text-foreground font-bold">DiamondTopUp</span> Admin Suite. All rights reserved.
      </div>
      <div className="flex gap-6 text-xs text-muted-foreground uppercase font-bold tracking-widest">
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms</a>
        <a href="#" className="hover:text-primary transition-colors">Support</a>
      </div>
    </footer>
  );
};

export default AdminFooter;
