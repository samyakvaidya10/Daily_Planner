export function calculateProjectProgress(project) {
  let total = 0;
  let completed = 0;

  project.milestones.forEach(m => {
    m.tasks.forEach(t => {
      t.subtasks.forEach(st => {
        total++;
        if (st.completed) completed++;
      });
    });
  });

  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
