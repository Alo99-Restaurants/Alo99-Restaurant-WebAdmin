import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import Image from 'next/image';
import { uploadImageService } from '@/services/upload.service';
import {
  getRestaurantImageByIdService,
  postRestaurantImageByIdService
} from '@/services/restaurant.service';
import { useNotification } from '@/context/NotificationContext';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({ idStoreBranch }) => {
  const { addNotification } = useNotification();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState([]);
  const fetchRestaurantImages = async (id) => {
    const response = await getRestaurantImageByIdService(id);
    const resImgList = response?.data?.items ?? [];
    const imgList = resImgList.map((item) => {
      return {
        uid: item.id,
        name: item.name,
        url: item.url
      };
    });
    setFileList(imgList);
  };

  useEffect(() => {
    if (idStoreBranch) {
      fetchRestaurantImages(idStoreBranch);
    }
  }, [idStoreBranch]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type='button'>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}>
        Upload
      </div>
    </button>
  );
  const handleUploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append('Files', file);
    try {
      const resUpload = await uploadImageService(fmData, config);
      const imgURL = resUpload?.data?.data;
      onSuccess('Ok');
      const resPostImg = await postRestaurantImageByIdService(
        idStoreBranch,
        imgURL
      );
      if (resPostImg?.data?.data) {
        addNotification('Upload restaurant image successful', 'success');
      }
    } catch (err) {
      console.log('Error: ', err);
      const newError = new Error('Some error');
      onError({ newError });
    }
  };
  const handleRemove = async (file) => {
    console.log('file', file);
  };
  return (
    <>
      <Upload
        accept='image/*'
        customRequest={handleUploadImage}
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        width={800}
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <Image
          width={500}
          height={500}
          loader={() => previewImage}
          alt='example'
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadImages;
