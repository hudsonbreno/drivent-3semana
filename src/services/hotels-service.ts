import { notFoundError } from '@/errors';
import { enrollmentRepository } from '@/repositories';
import hotelRepository from '@/repositories/hotels-repository';
import { ticketsRepository } from '@/repositories';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';

async function getHotels(userId: number) {
    const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollments) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollments.id);

    if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
      throw cannotListHotelsError(); // LANÇA UM ERRO PARA A FUNÇÃO QUE O CHAMOU
    }
  
    const hotels = await hotelRepository.findHotels();
    return hotels;
  }

  async function getHotelsWithRooms(userId: number, hotelId: number) {
    const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollments) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollments.id);

    if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
      throw cannotListHotelsError(); // LANÇA UM ERRO PARA A FUNÇÃO QUE O CHAMOU
    }
  
    const hotel = await hotelRepository.findHotelByHotelId(hotelId);
  
    if (!hotel) throw notFoundError();

    return hotel;
  }
  
  export default {
    getHotels,
    getHotelsWithRooms,
  };
  
  