
export const CategoryColumn = [
    {
        name: "No",
        selector: row => row.no,
        sortable: true,
    },
    {
        name: "Name" , 
        selector: row => row.name,
        sortable: true,
    }
];

export const QuizColumn = [
    {
        name: "No",
        selector: row => row.no,
        sortable: true,
    },
    {
        name: "Name" , 
        selector: row => row.name,
        sortable: true,
    },
    {
        name: "category",
        selector: row => row.category,
        sortable: true,
    },
    {
        name: "description" , 
        selector: row => row.description,
        sortable: true,
    },
    {
        name: "total Question" , 
        selector: row => row.totalQuestion,
        sortable: true,
    }
];

export const RulesColumn = [
    {
        name: "No",
        selector: row => row.no,
        sortable: true,
    },
    {
        name: "Quiz" , 
        selector: row => row.quiz,
        sortable: true,
    },
    {
        name: "Rule",
        selector: row => row.rules,
        sortable: true,
    },
   
];

export const QuestionColumn = [
    {
        name: "No",
        selector: row => row.No,
        sortable: true,
    },
    {
        name: "Quiz Name" , 
        selector: row => row.quizName,
        sortable: true,
    },
    {
        name: "Question Count",
        selector: row => row.questionCount,
        sortable: true,
    },
   
];