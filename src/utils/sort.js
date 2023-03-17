// export function prioritizeIds(idsToPrioritize, allIds) {
//   const remainingIds = allIds.filter((id) => !idsToPrioritize.includes(id));
//   return [...idsToPrioritize, ...remainingIds];
// }

export function prioritizeIds(priorityIds, items) {
  const sortedItems = items.slice().sort((a, b) => {
    const aPriority = priorityIds.includes(a.id);
    const bPriority = priorityIds.includes(b.id);

    if (aPriority && !bPriority) {
      return -1; // a is in priorityIds but b isn't, move a to the front
    } else if (!aPriority && bPriority) {
      return 1; // b is in priorityIds but a isn't, move b to the front
    } else {
      return 0; // both are in priorityIds or neither are, no sorting needed
    }
  });

  return sortedItems;
}

export function compareCreatedAt(a, b) {
  const createdAtA = a.createdAt;
  const createdAtB = b.createdAt;
  if (createdAtA.seconds < createdAtB.seconds) {
    return -1;
  }
  if (createdAtA.seconds > createdAtB.seconds) {
    return 1;
  }
  if (createdAtA.nanoseconds < createdAtB.nanoseconds) {
    return -1;
  }
  if (createdAtA.nanoseconds > createdAtB.nanoseconds) {
    return 1;
  }
  return 0;
}
