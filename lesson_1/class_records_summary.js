"use strict"

const WEIGHTED_EXAM_VALUE = .65;
const WEIGHTED_EXERCISES_VALUE = .35;
const NUMBER_OF_EXAMS = 4;

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

function generateClassRecordSummary(scores) {
  let students = Object.keys(scores);

  let compiledGrades = compileGrades(students, scores);
  let compiledExams = compileExamStats(students, scores);

  return { studentGrades: compiledGrades, exams: compiledExams, };
}

function compileGrades(students, scoreList) {
  let resultArr = []

  students.forEach((student) => {
    let exams = scoreList[student].scores.exams;
    let exercises = scoreList[student].scores.exercises;

    let avgExam = computeAvgExam(exams);
    let avgExercise = computeAvgExercise(exercises);
    let avgGrade = computeAvgGrade(avgExam, avgExercise);

    resultArr.push(avgGrade);
  });

  return resultArr;
}

function computeAvgExam(examScoreArr) {
  return examScoreArr.reduce((sum, num) => sum + num) / examScoreArr.length;
}

function computeAvgExercise(exerciseScoreArr) {
  return exerciseScoreArr.reduce((total, num) => total + num);
}

function computeAvgGrade(examAvg, exerciseAvg) {
  let weightedExamAvg = examAvg * WEIGHTED_EXAM_VALUE;
  let weightedExerciseAvg = exerciseAvg * WEIGHTED_EXERCISES_VALUE;

  let avgScore = Math.round(weightedExamAvg + weightedExerciseAvg);
  let letterGrade = determineLetterGrade(avgScore);

  return `${avgScore} (${letterGrade})`;
}

function determineLetterGrade(avgScore) {
  if (avgScore >= 93) return 'A';
  if (avgScore >= 85) return 'B';
  if (avgScore >= 77) 'C';
  if (avgScore >= 69) return 'D';
  if (avgScore >= 60) 'E';
  return 'F';
}

function compileExamStats(studentList, scoreList) {
  let scoresForEachExam = []
  for (let i = 0; i < NUMBER_OF_EXAMS; i += 1) { scoresForEachExam.push([]) }

  organizeScoresByExam(studentList, scoreList, scoresForEachExam);

  return scoresForEachExam.map((scores) => computeMinAvgMax(scores));
}

function organizeScoresByExam(students, scores, results) {
  students.forEach((student) => {
    let examsArr = scores[student].scores.exams;
    examsArr.forEach((score, index) => results[index].push(score));
  })
}

function computeMinAvgMax(examArr) {
  examArr.sort((a, b) => a - b);

  let min = examArr[0]
  let max = examArr[examArr.length - 1];
  let avg = computeAvgExam(examArr);

  return {average: avg, minimum: min, maximum: max};
}

console.log(generateClassRecordSummary(studentScores));

// returns:
// {
//   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//   exams: [
//     { average: 75.6, minimum: 50, maximum: 100 },
//     { average: 86.4, minimum: 70, maximum: 100 },
//     { average: 87.6, minimum: 60, maximum: 100 },
//     { average: 91.8, minimum: 80, maximum: 100 },
//   ],
// }