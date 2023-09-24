const publisher = <T>() => {
  const subscribers = new Set<(message: T) => void>();

  const subscribe = (subscriber: (message: T) => void) => {
    subscribers.add(subscriber);
  };

  const unsubscribe = (subscriber: (message: T) => void) => {
    subscribers.delete(subscriber);
  };

  const publish = (message: T) => {
    subscribers.forEach(subscriber => subscriber(message));
  };

  return ({ subscribe, unsubscribe, publish });
};

export default publisher;
