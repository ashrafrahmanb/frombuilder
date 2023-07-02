<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SurveyQuestionAnswer;
use App\Models\SurveyQuestion;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'type', 'question', 'description', 'data', 'survey_id'];


    public function questionAnswer()
    {
        return $this->hasMany(SurveyQuestionAnswer::class);
    }

    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }

}
