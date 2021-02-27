import { Request, Response } from 'express';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";

class AnswerController {
  //http://localhost:3333/answers/4?u=e81967b4-517c-4f57-b56b-5ae69b9155d7
  async execute(request: Request, response: Response){
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if(!surveyUser){
      throw new AppError("Survey user does not exists!")
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);
    return response.json(surveyUser);

  }
}

export { AnswerController }