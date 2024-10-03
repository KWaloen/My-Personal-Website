import Image from 'next/image';

export default function StuffImages() {
  // Array of 200 images, each with its source and title (from file name)
  const images = Array.from({ length: 200 }, (_, i) => ({
    src: `/FarmorsStuff/image${i + 1}.jpg`, // Path to image file
    title: `Image Title ${i + 1}`, // Replace with actual titles if they are known
    alt: `Image ${i + 1}`, // Use a generic alt text for accessibility
  }));

  const ImageGrid = () => (
    <div className="imageContainer">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          {/* Render the image */}
          <Image 
            src={image.src} 
            alt={image.alt} 
            title={image.title} // Set the title to show when hovering over the image
            width={300} 
            height={200} 
          />
          {/* Display the image title below the image */}
          <p>{image.title}</p>
        </div>
      ))}
    </div>
  );

  return (

      <ImageGrid />

  );
}
