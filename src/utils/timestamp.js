import { Timestamp } from 'firebase/firestore';

export const serializeTimestamps = (obj) => {
  if (obj instanceof Timestamp) {
    return obj.toDate();
  } else if (Array.isArray(obj)) {
    return obj.map((item) => serializeTimestamps(item));
  } else if (obj && typeof obj === 'object') {
    const serializedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      serializedObj[key] = serializeTimestamps(value);
    }
    return serializedObj;
  }
  return obj;
};
