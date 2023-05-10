import { expect } from 'vitest'

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoriesQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase // system-under-test

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoriesQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoriesQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'Example',
      slug: Slug.create('example-question'),
      content: 'example content',
    })

    inMemoriesQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
