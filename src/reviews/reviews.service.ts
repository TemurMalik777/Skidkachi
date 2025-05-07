import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private readonly reviewModel: typeof Review,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.reviewModel.create(createReviewDto);
  }

  async findAll() {
    return await this.reviewModel.findAll();
  }

  async findOne(id: number) {
    return await this.reviewModel.findOne({ where: { id } });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const [affectedCount, affectedRows] = await this.reviewModel.update(updateReviewDto, {
      where: { id },
      returning: true,
    });

    return affectedCount > 0 ? affectedRows[0] : null;
  }

  async remove(id: number) {
    const review = await this.reviewModel.findOne({ where: { id } });

    if (review) {
      await review.destroy();
      return { message: `Review with ID ${id} has been deleted` };
    }

    return { message: `Review with ID ${id} not found` };
  }
}
