<?php

namespace App\Models;
use App\Models\SurveyQuestion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['survey_question_id', 'survey_answer_id', 'answer'];

    public function question()
    {
        return $this->belongsTo(SurveyQuestion::class, 'survey_question_id', 'id');
    }
}
