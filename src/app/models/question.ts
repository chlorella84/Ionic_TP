export class Question{


    public Category : string;
    public Type : string; 
    public Difficulty : string;
    public Question : string;
    public Correct_answer : string;
    public Incorrect_answers: Array<string>;

    public constructor(Category : string, Type : string, Difficulty : string, Question : string, Correct_answer : string, Incorrect_answers: Array<string>){
        this.Category = Category;
        this.Type = Type;
        this.Difficulty = Difficulty;
        this.Question = Question;
        this.Correct_answer = Correct_answer;
        this.Incorrect_answers = Incorrect_answers;
         }
    

}