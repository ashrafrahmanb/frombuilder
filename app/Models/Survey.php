<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['title', 'description', 'expire_date', 'image', 'user_id', 'otp_code', 'otp_time', 'status', 'created_at', 'updated_at'];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }

    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class);
    }

     public function SurveyQuestionAnswers()
    {
        return $this->hasManyThrough(SurveyQuestionAnswer::class, SurveyQuestion::class, 'survey_id', 'survey_question_id', 'id', 'id');
    }
}
