/* StudyFlow — translations.js
   Adicione novos idiomas criando uma nova chave de nível superior (ex: 'es').
   Cada chave interna é referenciada via data-i18n="chave" no HTML,
   ou via SF_I18N.t('chave') no JavaScript. */

window.SF_TRANSLATIONS = {

  /* ──────────────── PORTUGUÊS (padrão) ──────────────── */
  pt: {
    /* Sidebar — seções e itens */
    'nav.section.main':         'Principal',
    'nav.section.tools':        'Ferramentas',
    'nav.grade':                'Grade Semanal',
    'nav.tasks':                'Lista de Tarefas',
    'nav.dashboard':            'Dashboard',
    'nav.analytics':            'Analytics',
    'nav.profile':              'Perfil',
    'nav.streak':               'dias seguidos',
    'nav.streak.single':        'dia seguido',

    /* Top bar — Lista de Tarefas */
    'tasks.title':              'Lista de Tarefas',
    'tasks.btn.new':            'Nova tarefa',
    'tasks.search.placeholder': 'Buscar tarefa...',

    /* Chips de filtro */
    'filter.all':               'Todas',
    'filter.urgent':            '🔴 Urgentes',
    'filter.inprogress':        '🟡 Em andamento',
    'filter.done':              '✅ Concluídas',

    /* Grupos de tarefas */
    'group.urgent':             '🔴 Urgentes',
    'group.inprogress':         '🟡 Em andamento',
    'group.pending':            '⚪ Pendentes',
    'group.done':               '✅ Concluídas',

    /* Estado vazio */
    'tasks.empty':              '📭 Nenhuma tarefa encontrada',

    /* Subtarefas */
    'subtask.add.placeholder':  '+ Adicionar subtarefa...',
    'subtask.section':          'Subtarefas',
    'subtask.progress':         'Progresso das subtarefas',

    /* Notas */
    'notes.section':            'Notas',
    'notes.placeholder':        'Anotações rápidas...',

    /* Botões do card */
    'card.delete':              'Excluir',
    'card.save':                'Salvar',

    /* Prazo */
    'deadline.done':            'Concluída',
    'deadline.late':            'Atrasada',
    'deadline.today':           'Hoje',
    'deadline.tomorrow':        'Amanhã',

    /* Painel direito */
    'panel.progress.title':     'Progresso geral',
    'panel.progress.label':     'concluído',
    'panel.progress.ring':      'tarefas esta semana',
    'panel.stat.urgent':        'Urgentes',
    'panel.stat.inprogress':    'Em andamento',
    'panel.stat.pending':       'Pendentes',
    'panel.stat.done':          'Concluídas',
    'panel.by.subject':         'Por matéria',
    'panel.streak.desc':        'sequência de estudo ativa',

    /* Top sub (abaixo do título) */
    'topbar.pending.single':    'pendente',
    'topbar.pending.plural':    'pendentes',
    'topbar.done.single':       'concluída',
    'topbar.done.plural':       'concluídas',

    /* Modal */
    'modal.title':              'Nova tarefa',
    'modal.label.title':        'Título',
    'modal.label.desc':         'Descrição (opcional)',
    'modal.label.subject':      'Matéria',
    'modal.label.type':         'Tipo',
    'modal.label.deadline':     'Prazo',
    'modal.label.priority':     'Prioridade',
    'modal.title.placeholder':  'Ex: Estudar capítulo 5 de Física',
    'modal.desc.placeholder':   'Detalhes, links, observações...',
    'modal.subject.default':    'Selecionar',
    'modal.type.work':          'Trabalho',
    'modal.type.exam':          'Prova',
    'modal.type.list':          'Lista',
    'modal.type.project':       'Projeto',
    'modal.type.seminar':       'Seminário',
    'modal.type.reading':       'Leitura',
    'modal.type.other':         'Outro',
    'modal.priority.high':      '🔴 Alta',
    'modal.priority.medium':    '🟡 Média',
    'modal.priority.low':       '🟢 Baixa',
    'modal.btn.cancel':         'Cancelar',
    'modal.btn.create':         'Criar tarefa',

    /* Toasts */
    'toast.task.done':          '✅ Tarefa concluída!',
    'toast.task.reopened':      '↩️ Tarefa reaberta',
    'toast.subtask.alldone':    '🎉 Todas as subtarefas concluídas!',
    'toast.saved':              '💾 Salvo!',
    'toast.deleted':            '🗑️ Tarefa excluída',
    'toast.created':            '✅ Tarefa criada!',
    'toast.error.load':         '⚠️ Erro ao carregar tarefas',

    /* Confirmações */
    'confirm.delete':           'Excluir esta tarefa?',

    /* Matérias */
    'subject.math':             'Matemática',
    'subject.physics':          'Física',
    'subject.chemistry':        'Química',
    'subject.programming':      'Programação',
    'subject.database':         'Banco de Dados',
    'subject.networks':         'Redes',
    'subject.portuguese':       'Português',
    'subject.english':          'Inglês',
    'subject.other':            'Outra',

    /* Seletor de idioma */
    'lang.label':               'Idioma',
  },

  /* ──────────────── ENGLISH ──────────────── */
  en: {
    /* Sidebar */
    'nav.section.main':         'Main',
    'nav.section.tools':        'Tools',
    'nav.grade':                'Weekly Schedule',
    'nav.tasks':                'Task List',
    'nav.dashboard':            'Dashboard',
    'nav.analytics':            'Analytics',
    'nav.profile':              'Profile',
    'nav.streak':               'days in a row',
    'nav.streak.single':        'day in a row',

    /* Top bar */
    'tasks.title':              'Task List',
    'tasks.btn.new':            'New task',
    'tasks.search.placeholder': 'Search tasks...',

    /* Filter chips */
    'filter.all':               'All',
    'filter.urgent':            '🔴 Urgent',
    'filter.inprogress':        '🟡 In progress',
    'filter.done':              '✅ Completed',

    /* Task groups */
    'group.urgent':             '🔴 Urgent',
    'group.inprogress':         '🟡 In progress',
    'group.pending':            '⚪ Pending',
    'group.done':               '✅ Completed',

    /* Empty state */
    'tasks.empty':              '📭 No tasks found',

    /* Subtasks */
    'subtask.add.placeholder':  '+ Add subtask...',
    'subtask.section':          'Subtasks',
    'subtask.progress':         'Subtask progress',

    /* Notes */
    'notes.section':            'Notes',
    'notes.placeholder':        'Quick notes...',

    /* Card buttons */
    'card.delete':              'Delete',
    'card.save':                'Save',

    /* Deadline */
    'deadline.done':            'Done',
    'deadline.late':            'Late',
    'deadline.today':           'Today',
    'deadline.tomorrow':        'Tomorrow',

    /* Right panel */
    'panel.progress.title':     'Overall progress',
    'panel.progress.label':     'completed',
    'panel.progress.ring':      'tasks this week',
    'panel.stat.urgent':        'Urgent',
    'panel.stat.inprogress':    'In progress',
    'panel.stat.pending':       'Pending',
    'panel.stat.done':          'Completed',
    'panel.by.subject':         'By subject',
    'panel.streak.desc':        'active study streak',

    /* Top sub */
    'topbar.pending.single':    'pending',
    'topbar.pending.plural':    'pending',
    'topbar.done.single':       'completed',
    'topbar.done.plural':       'completed',

    /* Modal */
    'modal.title':              'New task',
    'modal.label.title':        'Title',
    'modal.label.desc':         'Description (optional)',
    'modal.label.subject':      'Subject',
    'modal.label.type':         'Type',
    'modal.label.deadline':     'Deadline',
    'modal.label.priority':     'Priority',
    'modal.title.placeholder':  'e.g. Study chapter 5 of Physics',
    'modal.desc.placeholder':   'Details, links, notes...',
    'modal.subject.default':    'Select',
    'modal.type.work':          'Assignment',
    'modal.type.exam':          'Exam',
    'modal.type.list':          'Exercise list',
    'modal.type.project':       'Project',
    'modal.type.seminar':       'Seminar',
    'modal.type.reading':       'Reading',
    'modal.type.other':         'Other',
    'modal.priority.high':      '🔴 High',
    'modal.priority.medium':    '🟡 Medium',
    'modal.priority.low':       '🟢 Low',
    'modal.btn.cancel':         'Cancel',
    'modal.btn.create':         'Create task',

    /* Toasts */
    'toast.task.done':          '✅ Task completed!',
    'toast.task.reopened':      '↩️ Task reopened',
    'toast.subtask.alldone':    '🎉 All subtasks completed!',
    'toast.saved':              '💾 Saved!',
    'toast.deleted':            '🗑️ Task deleted',
    'toast.created':            '✅ Task created!',
    'toast.error.load':         '⚠️ Error loading tasks',

    /* Confirmations */
    'confirm.delete':           'Delete this task?',

    /* Subjects */
    'subject.math':             'Math',
    'subject.physics':          'Physics',
    'subject.chemistry':        'Chemistry',
    'subject.programming':      'Programming',
    'subject.database':         'Database',
    'subject.networks':         'Networks',
    'subject.portuguese':       'Portuguese',
    'subject.english':          'English',
    'subject.other':            'Other',

    /* Language selector */
    'lang.label':               'Language',
  },
};