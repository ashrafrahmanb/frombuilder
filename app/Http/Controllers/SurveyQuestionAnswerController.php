<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestionAnswer;
use Illuminate\Http\Request;
use App\Models\User;
class SurveyQuestionAnswerController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $survey_id = $request->id;
        // Get survey details
        //return $infos =  Survey::with('questions','SurveyQuestionAnswers')->where('user_id', $user->id)->where('id', $survey_id)->first();
       $infos =  Survey::with('questions')->where('user_id', $user->id)->where('id', $survey_id)->first();
       $totalAnswers = SurveyAnswer::query()->where('survey_id', $survey_id)->get(); 
       $question = SurveyQuestion::where('survey_id', $survey_id)->select('id', 'question')->get();
        $ans = [];
       if(!empty($totalAnswers)){
            foreach ($totalAnswers as $key => $value) {
                $answerData = SurveyQuestionAnswer::with('question:id,question')->where('survey_answer_id', $value->id)->get();
                $totalAnswers[$key]->answers = $answerData;
            }
        }   
    
        return [
            'data'=>$infos,
            'answers'=> $totalAnswers,
            'question'=>$question
        ];
    }
}
