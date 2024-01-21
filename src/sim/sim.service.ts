import { SimDto } from './dto/sim.dto';
import { SimEntity } from './entities/sim.entity';
import { Between, In, Like, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue } from 'typeorm/find-options/FindOptionsOrder';
import { BuySimDto } from './dto/buy-sim.dto';
import { DiscountEntity } from './entities/discount.entity';
import { DataSimUploadDto } from './dto/data-sim-upload.dto';
import * as nodemailer from 'nodemailer';
export class SimService {
  constructor(
    @InjectRepository(SimEntity)
    private readonly simRepository: Repository<SimEntity>,
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
  ) {}

  async getAll(query: SimDto) {
    let start = 0;
    let end = 0;
    let where = {};
    if (query.priceRange?.length > 0) {
      start = query.priceRange[0];
      end = query.priceRange[1];
      where = { ...where, price: Between(start, end) };
    }

    if (query.supplier) {
      where = { ...where, supplier: In(query.supplier) };
    }
    if (query.prefix) {
      where = { ...where, number: Like(`${query.prefix}%`) };
    }
    if (query.type) {
      where = { ...where, type: Like(`%${query.type}%`) };
    }
    if (query.avoidNumber) {
      where = { ...where, number: Not(Like(`%${query.avoidNumber}%`)) };
    }
    if (query.totalPoint) {
      where = { ...where, point: query.totalPoint };
    }
    if (query.totalNode) {
      where = { ...where, node: query.totalNode };
    }
    if (query.dob) {
      where = { ...where, number: Like(`%${query.dob}%`) };
    }
    if (query.numberPhone) {
      where = { ...where, number: Like(`%${query.numberPhone}%`) };
    }
    const { page, limit, order } = query.pagination;

    const skip = (page - 1) * limit;
    if (order) {
      const data = await this.simRepository.findAndCount({
        where,
        order: { price: order as FindOptionsOrderValue },
        skip,
        take: Number(limit),
      });
      return { sims: data[0], total: data[1] };
    } else {
      const data = await this.simRepository.findAndCount({
        where,
        skip,
        take: Number(limit),
      });
      return { sims: data[0], total: data[1] };
    }
  }

  async getOne(id: number) {
    try {
      console.log('id', id);
      return await this.simRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new Error('Sim not found');
    }
  }

  async buy(id: number, dataToBuy: BuySimDto) {
    const sim = await this.simRepository.findOneByOrFail({ id });
    if (sim) {
      const priceOriginal = sim.price;
      const require = dataToBuy.require || '';
      const methodPay = dataToBuy.methodPay;
      const typeSim = dataToBuy.typeSim;
      const codeDiscount = dataToBuy.codeDiscount;
      const dataDiscount = await this.discountRepository.findOneByOrFail({
        code: codeDiscount,
      });
      const numberCustomer = dataToBuy.numberCustomer;
      const totalPrice = sim.price - dataDiscount.percentDiscount * sim.price;
      const sex = dataToBuy.sex;
      const name = dataToBuy.name;
      const address = dataToBuy.address;
      const numberSim: string = sim.number;
      const supplier: string = sim.supplier;
      const typeBeautiful: string = sim.type;
      const data = {
        numberSim: numberSim,
        supplier: supplier,
        typeBeautiful: typeBeautiful,
        priceOriginal: priceOriginal,
        require: require,
        methodPay: methodPay,
        typeSim: typeSim,
        codeDiscount: codeDiscount,
        amountDiscount: dataDiscount.percentDiscount * priceOriginal,
        totalPrice: totalPrice,
        sex: sex,
        name: name,
        address: address,
        numberCustomer: numberCustomer,
      };
      const message = this.createMessage(data);
      await this.sendEmail(message);
      return { status: 'success' };
    } else {
      throw new Error('Sim not found');
    }
  }
  createMessage(data: any): string {
    const {
      numberSim,
      supplier,
      typeBeautiful,
      priceOriginal,
      require,
      methodPay,
      typeSim,
      codeDiscount,
      amountDiscount,
      totalPrice,
      sex,
      name,
      address,
      numberCustomer,
    } = data;

    const message = `
    Dear Admin,

    Đơn hàng mới!

    Chi tiết đơn hàng:
    - Số sim: ${numberSim}
    - Nhà mạng: ${supplier}
    - Loại sim: ${typeBeautiful}
    - Họ tên: ${name}
    - Số điện thoại khách hàng: ${numberCustomer}
    - Giá sim: ${priceOriginal}
    - Mã giảm giá: ${codeDiscount}
    - Số tiền được giảm: ${amountDiscount}
    - Tổng tiền: ${totalPrice}
    - Giới tính: ${sex}
    - Yêu cầu bổ sung: ${require}
    - Phương thức thanh toán: ${methodPay}
    - Loại sim: ${typeSim}
    - Địa chỉ: ${address}

    Vui lòng liên hệ khách hàng sớm nhất để xác nhận đơn hàng.
  `;

    return message;
  }

  async sendEmail(message) {
    // Thông tin cấu hình SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'giaresimvip@gmail.com',
        pass: 'tdye jrxb yjzy hqjo',
      },
    });
    const mailOptions = {
      from: 'giaresimvip@gmail.com',
      to: 'simvipgiare.com@gmail.com',
      subject: 'Purchase Confirmation',
      text: message,
    };

    try {
      // Gửi email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new Error('Error sending email');
    }
  }

  async uploadSims(data: DataSimUploadDto) {
    const { numbers, supplier, subcribsionType, price, simType } = data;
    const dataToSave = [];
    for (let i = 0; i < numbers.length; i++) {
      const sim = new SimEntity();
      const myArray: string[] = simType;
      const resultString: string = myArray.join(',');
      sim.number = numbers[i];
      sim.supplier = supplier;
      sim.subcribsionType = subcribsionType;
      sim.type = resultString;
      sim.price = price;
      sim.point = this.caculatePoint(numbers[i]);
      sim.node = this.caculateNode(numbers[i]);
      sim.other = {};
      dataToSave.push(sim);
    }
    return await this.simRepository.save(dataToSave);
  }
  caculatePoint(number: string) {
    const digitsArray = number.split('').map(Number);
    const sum = digitsArray.reduce((acc, digit) => acc + digit, 0);
    return sum;
  }
  caculateNode(number: string) {
    const sum = this.caculatePoint(number);
    if (sum === 10) {
      return 10;
    } else {
      return sum % 10;
    }
  }
}
