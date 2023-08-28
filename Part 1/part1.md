###Part 1 [~30 minutes]###

A.How would you technically implement generating a screenshot image of a part of the screen in
the Teleo app? Please identify 2-3 different approaches you could take (such as different
libraries or APIs to use), describe the pros and cons of each, and provide a recommendation.
(No need to actually write any code.)

Approaches:

#1: In the first approach we could use the html2canvas library, which allows us to capture and render the contents of an HTML element, including the entire screen, we could also specified the type of image we want to generate.

Pros:

1. User don't need to wait on any external services, this is all done on the client.
2. The community is strong and active.
3. Good browser support - html2canvas is over 9 years old.
4. There are regular questions (and answers!) on Stack Overflow.

Cons:

1. Doesn't support Shadow DOM or Web Components
2. There's a pull request open to add support, and it looks like the maintainers are keen to get it merged.
3. Cross-Origin restrictions - when you add elements that contain requests to the canvas (like images, stylesheets etc), they're subject to the same CORs policies that normal requests are.
4. Doesn't support every CSS property
5. Can be fragile to browser updates, occasionally breaking existing functionality.

#2: In case we don't want to relay in any external library we could use the Screen Capture API which is a relatively a new feature of the browsers that let the users select a screen or portion of the screen such as a window, to capture as media stream, this stream can be recorded or shared ofver the network.

It's important to notice that this feature is only availble for modern browsers, to be able to make it availble for older browsers we will need to use a polifill or library that provide similar functionality to the Screen Capture API dor older browsers.

Pros:

1. Good moderns browser suppoer, it's a native api, which it conmes built-in to moderns browsers, there's no need for any third party script or code.
2. We could add support for videos in the future.
3. The getDisplayMedia API can record either desktop or browser windod making it great for taking screenshoot to something other than your applicaiton.

Cons:

1. Permissions: You need to get permissiones from the user to record. that would depends on the browser, the permissions dialogue can look different and can sometimes be confusing.
2. Slow: Because we will need to he permission, it can take the user a while to click accept and understand what is happening.

#3: We could we also use screenshoot as a service to save the a image of a portion of the screen, like for example: URL2png, Stillio, UrlBox, etc.

Pros:

1. Services can handle post processing too, offering the flexibility to generate images in different file types, sizes, quality and more.
2. The services are used by many people and facilitate large volumes of requests
3. You don't need to maintain the infrastructure to manage the process of taking a screenshot

Cons:

1. The screenshot might not be what the user sees. For example, if the user has interacted with the page, or if they're authenticated, the screenshot service won't be able to render the same page for a screenshot
2. out of the three options, this is the only one that comes with a cost. Although it's quite cheap, if you're handling large volumes of screenshots, it could be expensive.
3. out of the three options, this is the only one that comes with a cost. Although it's quite cheap, if you're handling large volumes of screenshots, it could be expensive.

Final Recommedation:

Accuracy and Control: If you need accurate and customizable screenshot capture within your application, the Screen Capture API or HTML2Canvas might be better options, with the Screen Capture API potentially offering better browser compatibility.

Automation and Scheduling: If you require frequent or automated screenshot capture, third-party services like Stillio or UrlBox might provide more convenient solutions with features like scheduling and automated capture.

Integration: If you want to seamlessly integrate screenshot capture into your application, using HTML2Canvas or the Screen Capture API would provide greater control over the implementation.

Cost: Third-party services often come with subscription costs, so consider your budget and usage requirements.

Usefull refs:

1. https://hackernoon.com/how-to-take-screenshots-in-the-browser-using-javascript-l92k3xq7
2. https://webrtc.github.io/samples/src/content/getusermedia/getdisplaymedia/
3. https://udn.realityripple.com/docs/Web/API/MediaDevices/getDisplayMedia

B.Once you have generated the screenshots, where/how would you store them? Again, no need
to actually implement this, just describe your approach and rationale.

1 - By using the third approach we will relay our desition in the third party tool that we are going to choose based on conveniences, by choosing the first and second approach we could build a service in our application that creates the images and use the session storage to save the image in the session, once we reach an considerable amount of images, we could send these images to an backend API that will store these images in the database as blob or any other type, after it we could clean the images key in our session storage releasing the memory in used.

I would suggest evaluating the following:

BLOB (Binary Large Object):

Advantages: BLOB is a standard data type for storing binary data, including images. It can handle images of any size and format.

Considerations: While BLOBs are versatile, they can potentially impact database performance, especially when dealing with large images. Retrieving images from BLOBs might require additional memory and processing.
Base64 Encoded String:

Advantages: Storing images as base64 encoded strings within a text field is an option. It's easy to work with and doesn't require a separate BLOB field.

Base64:

Considerations: Base64 encoding increases the data size by about 33%, which might not be efficient for larger images. It can also impact database performance and storage requirements.
File Paths/URLs:

Advantages: Instead of storing the actual image, you can store file paths or URLs pointing to where the images are stored on the server or in cloud storage. This reduces database storage and can improve performance.

Considerations: This approach requires managing files separately and ensuring that the files remain accessible at the specified paths or URLs.

Image Thumbnails or Previews:

Advantages: Instead of storing the original image, you can store resized thumbnails or previews in the database. This can reduce storage and retrieval time for displaying images in lists or previews.
Considerations: You might need to generate and manage multiple versions of the same image for different purposes.
External Storage:

Advantages: Storing images in external cloud storage services (e.g., Amazon S3, Google Cloud Storage) and saving URLs in the database is a scalable approach that offloads storage and reduces database load.
Considerations: It introduces additional complexity in terms of managing external storage, permissions, and ensuring availability of images.In most cases, storing images as BLOBs or using external storage are common approaches. Choose the approach that aligns with your application's performance, scalability, and maintenance requirements

1. https://stackoverflow.com/questions/9722603/storing-image-in-database-directly-or-as-base64-data#:~:text=While%20base64%20is%20fine%20for,over%20a%20raw%20binary%20format.
2. https://www.reddit.com/r/dotnet/comments/udo2cf/is_it_a_good_idea_to_convert_images_into_base64/
3. https://bunny.net/blog/why-optimizing-your-images-with-base64-is-almost-always-a-bad-idea/
