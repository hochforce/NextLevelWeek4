import { Request, Response } from 'express';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { getCustomRepository, Not, IsNull } from "typeorm";

/**
 * Detratores => 0 a 6
 * Passivos => 7 a 8
 * Promotores => 9 a 10
 * 
 * (número de promotores - número de detratores) / (número de respondentes) x 100
 */

class NpsController{
  async execute(request: Request, response: Response){
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
     
    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractors = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <=6  
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passives = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps: calculate
    })
  }
}

export { NpsController };