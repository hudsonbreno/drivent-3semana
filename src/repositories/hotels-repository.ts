import { prisma } from '@/config';

async function findHotels(){
    const result = prisma.hotel.findMany();

    return result
}

async function findHotelByHotelId(hotelId: number) {
    return prisma.hotel.findFirst({
      where: {
        id: hotelId,
      },
      include: {
        Rooms: true,
      },
    });
  }
  

const hotelRepository = {
    findHotels,
    findHotelByHotelId,
}

export default hotelRepository;