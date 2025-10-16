import React, { useState } from 'react';

// Utility function to merge classNames
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const Avatar = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Avatar.displayName = "Avatar";

export const AvatarImage = React.forwardRef(({ className, src, alt, onError, ...props }, ref) => {
  const [imageError, setImageError] = useState(false);

  const handleError = (e) => {
    setImageError(true);
    if (onError) {
      onError(e);
    }
  };

  if (imageError) {
    return null;
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onError={handleError}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-600",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AvatarFallback.displayName = "AvatarFallback";