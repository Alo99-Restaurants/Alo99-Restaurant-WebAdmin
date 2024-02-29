'use client';
import BookingCard from '@/components/Card/BookingCard';
import BookingDetailCard from '@/components/Card/BookingDetailCard';
import { sortByModifiedDate } from '@/helper';
import {
  getBookingByIdService,
  getBookingService,
  updateStatusBookingService
} from '@/services/restaurant.booking.service';
import useStoreBranchesStore from '@/store/storeBranches';
import { DatePicker, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

function OrderManagement() {
  const { storeBranchActive, storeBranches } = useStoreBranchesStore(
    useShallow((state) => ({
      storeBranchActive: state.storeBranchActive,
      storeBranches: state.storeBranches
    }))
  );
  const [bookingData, setBookingData] = useState([]);
  const [bookingQueries, setBookingQueries] = useState({
    RestaurantId: storeBranchActive.id,
    BookingDate: dayjs().format('YYYY-MM-DD')
  });

  const [bookingIdSelected, setBookingIdSelected] = useState();
  const [bookingActive, setBookingActive] = useState({});

  const [isBookingStatusUpdated, setIsBookingStatusUpdated] = useState(false);

  // console.log('storeBranchActive', storeBranchActive);
  // console.log('bookingQueries', bookingQueries);

  useEffect(() => {
    if (storeBranchActive.id)
      setBookingQueries((prev) => {
        return {
          ...prev,
          RestaurantId: storeBranchActive.id
        };
      });
  }, [storeBranchActive]);

  // Auto recall API after 5s
  useEffect(() => {
    const fetchBookingData = (payload) => {
      getBookingService(payload)
        .then((response) => {
          const dataBooing = sortByModifiedDate(response?.data?.items, 'asc');
          setBookingData(dataBooing);
        })
        .catch((error) => {
          console.error('Error fetching Booking Service', error);
        })
        .finally(() => {
          setIsBookingStatusUpdated(false);
        });
    };

    if (bookingQueries.RestaurantId) {
      fetchBookingData(bookingQueries);
    }

    const fetchDataInterval = setInterval(() => {
      if (bookingQueries.RestaurantId) {
        fetchBookingData(bookingQueries);
      }
    }, 10000); // 10s

    return () => clearInterval(fetchDataInterval);
  }, [bookingQueries, isBookingStatusUpdated]);


  useEffect(() => {
    const fetchBookingDetailById = (id) => {
      getBookingByIdService(id)
        .then((response) => {
          const dataBooingDetail = response?.data?.data;
          setBookingActive({
            bookingDetail: dataBooingDetail
          });
        })
        .catch((error) => {
          console.error('Error fetching Booking Detail Service', error);
        })
        .finally(() => {
          setIsBookingStatusUpdated(false);
        });
    };
    if (bookingIdSelected) {
      fetchBookingDetailById(bookingIdSelected);
    }
  }, [bookingIdSelected, isBookingStatusUpdated]);

  const handleChangeDateFilter = (date, dateString) => {
    if (!dateString) {
      setBookingQueries((prev) => {
        const { BookingDate, ...newPrev } = prev;
        return newPrev;
      });
    } else {
      setBookingQueries((prev) => ({
        ...prev,
        BookingDate: dayjs(dateString).format('YYYY-MM-DD')
      }));
    }
  };

  const handleChangeStatusFilter = (status) => {
    if (!status.length) {
      setBookingQueries((prev) => {
        const { BookingStatus, ...newPrev } = prev;
        return newPrev;
      });
    } else {
      setBookingQueries((prev) => ({
        ...prev,
        BookingStatus: status
      }));
    }
  };

  const handleUpdateStatusBooking = async (bookingId, newStatus) => {
    const payload = {
      bookingIds: [bookingId],
      bookingStatus: newStatus
    };
    try {
      const response = await updateStatusBookingService(payload);
      setIsBookingStatusUpdated(true);
    } catch (error) {
      console.error('Error Update Booking Status Service', error);
    }
  };

  const colorRenderWithStatus = (value) => {
    if (value === 'New') {
      return '#4bae4b';
    } else if (value === 'Confirm') {
      return '#2db7f5';
    } else if (value === 'Cancelled') {
      return 'red';
    } else if (value === 'Completed') {
      return 'purple';
    } else {
      return 'gray';
    }
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={colorRenderWithStatus(value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3
        }}>
        {label}
      </Tag>
    );
  };

  return (
    <div className='h-full w-full flex-row'>
      <div className='p-2 flex-none h-14'>
        <div className='flex gap-10'>
          <div className='flex items-center gap-2'>
            <p>Filter by Date:</p>
            <DatePicker
              format={'MM/DD/YYYY'}
              defaultValue={dayjs()}
              onChange={handleChangeDateFilter}
            />
          </div>
          <div className='flex items-center gap-2'>
            <p>Filter by Status:</p>
            <Select
              allowClear
              tagRender={tagRender}
              style={{ minWidth: 200 }}
              mode='multiple'
              onChange={handleChangeStatusFilter}
              options={[
                { value: 'New', label: 'New' },
                { value: 'Confirm', label: 'Confirm' },
                { value: 'Using', label: 'Using' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' }
              ]}
            />
          </div>
        </div>
      </div>
      <div className='booking-panel flex flex-1 h-full pb-14 '>
        <div className='flex-[1]  px-4 overflow-y-scroll border-2 mx-2'>
          {bookingData.map((booking) => (
            <BookingCard
              key={booking.id}
              isActive={booking.id === bookingIdSelected}
              onUpdateStatusBooking={handleUpdateStatusBooking}
              onSelected={setBookingIdSelected}
              colorStatus={colorRenderWithStatus(booking.bookingStatusId)}
              booking={booking}
            />
          ))}
        </div>
        <div className='flex-[2] w-full'>
          {bookingData?.length > 0 && bookingActive?.bookingDetail && (
            <BookingDetailCard
              bookingActive={bookingActive}
              colorStatus={colorRenderWithStatus(
                bookingActive.bookingDetail?.bookingStatusId
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
