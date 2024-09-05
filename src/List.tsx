import React, { useState } from "react";
import { Typography, Pagination, Modal } from "antd";
import "./styles.css";
import { usePhotoStore } from "searchBar/store";
import { downloadImage } from "./utils";

const App = () => {
  const [current, setCurrent] = useState<any>(null);
  const {
    setPage,
    state: { photos = [], page, totalPages },
  } = usePhotoStore();

  const handlePagination = (localPage: number) => {
    setPage(localPage);
  };

  const handleClose = () => setCurrent(null);

  return (
    <>
      {photos?.length ? (
        <>
          <div className="container">
            {photos.map((photo: any, index: number) => {
              console.log("🚀 ~ {photos.map ~ photo:", photo);
              return (
                <div
                  key={index}
                  onClick={() => setCurrent(photo)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={photo?.src?.medium || ""}
                    width="100%"
                    alt={photo?.alt}
                    height="100%"
                    style={{ aspectRatio: "16 / 9" }}
                  ></img>
                </div>
              );
            })}
          </div>
          <div className="paginationContainer">
            <Pagination
              defaultCurrent={page}
              total={totalPages}
              onChange={handlePagination}
            />
          </div>
        </>
      ) : (
        <div className="textContainer">
          <Typography>It looks like we don't have matches</Typography>
        </div>
      )}

      <Modal
        title="Image detail"
        open={current}
        onClose={handleClose}
        onCancel={handleClose}
        onOk={() => downloadImage(current?.src?.landscape, current?.alt)}
        okText="Download"
      >
        <img
          src={current?.src?.large || ""}
          width="100%"
          alt={current?.alt}
          height="100%"
          style={{ aspectRatio: "16 / 9" }}
        ></img>
      </Modal>
    </>
  );
};

export default App;
