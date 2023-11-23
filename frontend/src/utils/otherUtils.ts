export function generateUniqueId(): string {
    const timestamp = new Date().getTime();
    const randomChars = Math.random().toString(36).substring(2, 8);
  
    return `${timestamp}${randomChars}`;
  }