import { Form } from './types/types';

const grammaticalForms = new Map<string, Form>();
grammaticalForms.set(
  'singular',
  {
    grammarId: 1,
    name: 'Singular',
    abreviation: 'S',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'plural',
  {
    grammarId: 2,
    name: 'Plural',
    abreviation: 'P',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'masculine',
  {
    grammarId: 3,
    name: 'Masculine',
    abreviation: 'M',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'feminine',
  {
    grammarId: 4,
    name: 'Feminine',
    abreviation: 'F',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'neuter',
  {
    grammarId: 5,
    name: 'Neuter',
    abreviation: 'N',
    lessonId: 5,
  },
);
grammaticalForms.set(
  'first',
  {
    grammarId: 6,
    name: '1st Person',
    abreviation: '1st',
    lessonId: 5,
  },
);
grammaticalForms.set(
  'second',
  {
    grammarId: 7,
    name: '2nd Person',
    abreviation: '2nd',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'third',
  {
    grammarId: 8,
    name: '3rd Person',
    abreviation: '3rd',
    lessonId: 8,
  },
);
grammaticalForms.set(
  'present',
  {
    grammarId: 9,
    name: 'Present',
    abreviation: 'P',
    lessonId: 3,
  },
);
grammaticalForms.set(
  'aorist',
  {
    grammarId: 10,
    name: 'Aorist',
    abreviation: 'A',
    lessonId: 7,
  },
);
grammaticalForms.set(
  'imperfect',
  {
    grammarId: 11,
    name: 'Imperfect',
    abreviation: 'I',
    lessonId: 7,
  },
);
grammaticalForms.set(
  'future',
  {
    grammarId: 12,
    name: 'Future',
    abreviation: 'F',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'perfect',
  {
    grammarId: 13,
    name: 'Perfect',
    abreviation: 'Pf',
    lessonId: 10,
  },
);
grammaticalForms.set(
  'pluperfect',
  {
    grammarId: 14,
    name: 'Pluperfect',
    abreviation: 'PPf',
    lessonId: 10,
  },
);
grammaticalForms.set(
  'preposition',
  {
    grammarId: 15,
    name: 'Preposition',
    abreviation: 'Prep',
    lessonId: 8,
  },
);
grammaticalForms.set(
  'active',
  {
    grammarId: 16,
    name: 'Active',
    abreviation: 'A',
    lessonId: 3,
  },
);
grammaticalForms.set(
  'middle',
  {
    grammarId: 17,
    name: 'Middle',
    abreviation: 'M',
    lessonId: 12,
  },
);
grammaticalForms.set(
  'passive',
  {
    grammarId: 18,
    name: 'Passive',
    abreviation: 'P',
    lessonId: 12,
  },
);
grammaticalForms.set(
  'indicative',
  {
    grammarId: 19,
    name: 'Indicative',
    abreviation: 'I',
    lessonId: 2,
  },
);
grammaticalForms.set(
  'subjunctive',
  {
    grammarId: 20,
    name: 'Subjunctive',
    abreviation: 'S',
    lessonId: 23,
  },
);
grammaticalForms.set(
  'imperative',
  {
    grammarId: 21,
    name: 'Imperative',
    abreviation: 'Imp',
    lessonId: 24,
  },
);
grammaticalForms.set(
  'optative',
  {
    grammarId: 22,
    name: 'Optative',
    abreviation: 'Opt',
    lessonId: 24,
  },
);
grammaticalForms.set(
  'first-person',
  {
    grammarId: 23,
    name: 'First Declension',
    abreviation: '1st',
    lessonId: 2,
  },
);
grammaticalForms.set(
  'second-person',
  {
    grammarId: 24,
    name: 'Second Declension',
    abreviation: '2nd',
    lessonId: 2,
  },
);
grammaticalForms.set(
  'third-person',
  {
    grammarId: 25,
    name: 'Third Declension',
    abreviation: '3rd',
    lessonId: 2,
  },
);
grammaticalForms.set(
  'nominative',
  {
    grammarId: 26,
    name: 'Nominative',
    abreviation: 'Nom',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'genative',
  {
    grammarId: 27,
    name: 'Genative',
    abreviation: 'Gen',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'dative',
  {
    grammarId: 28,
    name: 'Dative',
    abreviation: 'Dat',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'accusative',
  {
    grammarId: 29,
    name: 'Accusative',
    abreviation: 'Acc',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'noun',
  {
    grammarId: 30,
    name: 'Noun',
    abreviation: 'N',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'pronoun',
  {
    grammarId: 31,
    name: 'Pronoun',
    abreviation: 'Pn',
    lessonId: 9,
  },
);
grammaticalForms.set(
  'finite',
  {
    grammarId: 32,
    name: 'Verb',
    abreviation: 'V',
    lessonId: 2,
  },
);
grammaticalForms.set(
  'preposition',
  {
    grammarId: 33,
    name: 'Preposition',
    abreviation: 'Prep',
    lessonId: 8,
  },
);
grammaticalForms.set(
  'article',
  {
    grammarId: 34,
    name: 'Article',
    abreviation: 'Art',
    lessonId: 4,
  },
);
grammaticalForms.set(
  'particle',
  {
    grammarId: 35,
    name: 'Particle',
    abreviation: 'Particle',
    lessonId: 1,
  },
);
grammaticalForms.set(
  'participle',
  {
    grammarId: 36,
    name: 'Participle',
    abreviation: 'participle',
    lessonId: 20,
  },
);
grammaticalForms.set(
  'adjective',
  {
    grammarId: 37,
    name: 'Adjective',
    abreviation: 'adjective',
    lessonId: 6,
  },
);
grammaticalForms.set(
  'adverb',
  {
    grammarId: 38,
    name: 'Adverb',
    abreviation: 'adverb',
    lessonId: 20,
  },
);
grammaticalForms.set(
  'infinitive',
  {
    grammarId: 39,
    name: 'Infinitive',
    abreviation: 'infinitive',
    lessonId: 21,
  },
);

export default grammaticalForms;
