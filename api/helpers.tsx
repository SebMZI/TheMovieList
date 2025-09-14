export const getTopCast = (castArray) =>
  (castArray ?? []).sort((a,b) => a.order - b.order).slice(0, 4).map(m => m.name).join(", ");

export const getProducers = (crewArray) =>
  (crewArray ?? []).filter(c => c.job === "Producer" || c.job === "Executive Producer")
                    .slice(0,9)
                    .map(c => c.name)
                    .join(", ");
