import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createHotel(){
    return prisma.hotel.create({
        data: {
          name: faker.name.firstName(),
          image: faker.image.city(),
        },
      });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.firstName(),
      capacity: 2,
      hotelId: hotelId,
    },
  });
}