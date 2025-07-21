import { useEffect, useRef, useState } from "react";
import { Button, Pagination } from "antd";
import Swal from "sweetalert2";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Not complete",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
  {
    key: "1",

    user: {
      name: "Mr. Mahmud",
      img: "https://s3-alpha-sig.figma.com/img/1fd9/17e4/f08baf26ed16adf5307d770dd8457112?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iXqAmEICIGNvEBtCjEnR9fTJAd4rJ-n5iRBlxrUNBi1oBPwY8WGb8RZ-FvOa6OD7OUMzrMW4VvGoXEOCuWVgt7gpAlQWE32c0Us34dH~mgfSdhiPVF5LRv-ZbCDBKnOi9wSduhpC3kJzHPBVE3I5xYisd1ZL5KTfsUrsOYfGqG-WkfFbiodptiwn~X73FG8EdjfH6jvAKq7FsUO66qplp5gAJdqHq8iZbIHwpCB0Wr1-p~EfVRE6CMWwxKHhzjxcbr1XQACmIfyoUcWPsXILW0lleXlvOrEtTx9T-DfTu25cUKx8SDMLnjCx-ctZTlrpKSvC3yIqaDcb--3G0s5amA__",
    },
    salon: "Perfect Salon",
    service_orders: "Afro hair care...",
    booking_date: "8/16/13",
    price: "100€",
    status: "Completed",
  },
];

const Notification = () => {
  const [booking, setBooking] = useState("Booking Date");
  const [status, setStatus] = useState("Status");
  const [salon, setSalon] = useState("Salon");
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const dropdownRef = useRef();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onClickBooking = ({ key }) => {
    setBooking(key);
  };
  const onClickSalon = ({ key }) => {
    setSalon(key);
  };
  const onClickStatus = ({ key }) => {
    setStatus(key);
  };

  const onSelect = (newValue) => {
    const date = newValue.format("MMM-DD-YYYY");
    setValue(date);
    const params = new URLSearchParams(window.location.search);
    params.set("date", date);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const pageSize = 9;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="h-[86vh]">
      <div className="relative h-full"
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "16px 0",
          }}
        >
          <div>
            <h3
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Notifications
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Button
              style={{
                height: "40px",

                borderRadius: "8px",
                border: "2px solid #BB6D42",

                background: "white",

                color: "#BB6D42",
                fontWeight: "400",
                fontSize: 14,
              }}
            >
              <span>Read all</span>
            </Button>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "16px 0",
              alignItems: "center",
              background: "#FEF1E6",
              height: "80px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "40px",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#555555",
                  }}
                >
                  A new order has arrived
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#A7A7A7",
                  }}
                >
                  8:00am, today
                </span>
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#818181",
                }}
              >
                Babaji salon , order date 10 jun, 2024.
              </p>
            </div>
            <div
              style={{
                padding: "0px 20px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#BB6D42",
                }}
              >
                View
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "16px 0",
              alignItems: "center",
              background: "white",
              height: "80px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "40px",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#555555",
                  }}
                >
                  A new order has arrived
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#A7A7A7",
                  }}
                >
                  8:00am, today
                </span>
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#818181",
                }}
              >
                Babaji salon , order date 10 jun, 2024.
              </p>
            </div>
            <div
              style={{
                padding: "0px 20px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#BB6D42",
                }}
              >
                View
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "16px 0",
              alignItems: "center",
              background: "white",
              height: "80px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "40px",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#555555",
                  }}
                >
                  A new order has arrived
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#A7A7A7",
                  }}
                >
                  8:00am, today
                </span>
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#818181",
                }}
              >
                Babaji salon , order date 10 jun, 2024.
              </p>
            </div>
            <div
              style={{
                padding: "0px 20px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#BB6D42",
                }}
              >
                View
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "16px 0",
              alignItems: "center",
              background: "white",
              height: "80px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "40px",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#555555",
                  }}
                >
                  A new order has arrived
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#A7A7A7",
                  }}
                >
                  8:00am, today
                </span>
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#818181",
                }}
              >
                Babaji salon , order date 10 jun, 2024.
              </p>
            </div>
            <div
              style={{
                padding: "0px 20px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#BB6D42",
                }}
              >
                View
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "16px 0",
              alignItems: "center",
              background: "white",
              height: "80px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  gap: "40px",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#555555",
                  }}
                >
                  A new order has arrived
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#A7A7A7",
                  }}
                >
                  8:00am, today
                </span>
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#818181",
                }}
              >
                Babaji salon , order date 10 jun, 2024.
              </p>
            </div>
            <div
              style={{
                padding: "0px 20px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#BB6D42",
                }}
              >
                View
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={data.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            size="small"
            itemRender={(pageNum, type, originalElement) => {
              if (type === "prev") {
                return (
                  <a
                    className="hover:text-[#333333]"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <LeftOutlined />
                    <span className="mr-2">Previous</span>
                  </a>
                );
              }
              if (type === "next") {
                return (
                  <a
                    className="hover:text-[#333333]"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <span className="ml-2">Next</span>
                    <RightOutlined />
                  </a>
                );
              }
              return originalElement;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
