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
  let result = { studentGrades: [], exams: [[], [], [], []], };
  let students = Object.keys(scores);

  compileGrades(students, scores, result.studentGrades);
  compileExamStats(students, scores, result.exams);

  return result;
}

function compileGrades(students, scoreList, resultArr) {
  students.forEach((student) => {
    let examsArr = scoreList[student].scores.exams;
    let exercisesArr = scoreList[student].scores.exercises;

    let avgExam = computeExamAvg(examsArr);
    let avgExercise = computeExerciseAvg(exercisesArr);
    let avgGrade = computeAvgGrade(avgExam, avgExercise);

    resultArr.push(avgGrade);
  });
}

function computeExamAvg(examScoreArr) {
  let totalScore = examScoreArr.reduce((sum, currentVal) => sum + currentVal);
  return totalScore / NUMBER_OF_EXAMS;
}

function computeExerciseAvg(exerciseScoreArr) {
  return exerciseScoreArr.reduce((total, currentVal) => total + currentVal);
}

function computeAvgGrade(examAvg, exerciseAvg) {
  let weightedExamAvg = examAvg * WEIGHTED_EXAM_VALUE;
  let weightedExerciseAvg = exerciseAvg * WEIGHTED_EXERCISES_VALUE;

  let avgScore = Math.round(weightedExamAvg + weightedExerciseAvg);
  let letterGrade = determineLetterGrade(avgScore);

  return `${avgScore} (${letterGrade})`;
}

function determineLetterGrade(avgScore) {
  if (avgScore >= 93 && avgScore <= 100) {
    return 'A';
  } else if (avgScore >= 85) {
    return 'B';
  } else if (avgScore >= 77) {
    return 'C';
  } else if (avgScore >= 69) {
    return 'D';
  } else if (avgScore >= 60) {
    return 'E';
  } else {
    return 'F';
  }
}

function compileExamStats(studentList, scoreList, resultArr) {
  studentList.forEach((student) => {
    let examsArr = scoreList[student].scores.exams;
    organizeScoresByExam(examsArr, resultArr);
  })

 resultArr = resultArr.map((scores) => computeMinAvgMax(scores));
}

function organizeScoresByExam(scoresArr, examArr) {
  scoresArr.forEach((score, index) => {
    examArr[index].push(score);
  });
}

function computeMinAvgMax(examArr) {
  examArr.sort((a, b) => a - b);

  let min = examArr[0]
  let max = examArr[examArr.length - 1];
  let avg = computeExamAvg(examArr);

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