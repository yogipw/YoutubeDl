const startBtn = document.querySelector('.start-btn')
const videoURLInput = document.querySelector('.video-url-input')
const videoThumbnailImg = document.querySelector('.video-thumbnail')
const videoTitleDiv = document.querySelector('.video-title')
const resolutionsDiv = document.querySelector('.resolutions')
const downloadBtn = document.querySelector('.download-btn')
const videoResolutionsSection = document.querySelector('.video-resolutions-section')
const videoInfoSection = document.querySelector('.video-info-section')
const videoForamtsSection = document.querySelector('.video-formats-section')


const getVideoID = () => {
    const url = videoURLInput.value
    const searchParams = new URLSearchParams(url.split('?')[1])
    return url
}

const getVideoInfo = async (id) => {
    const res = await fetch(`/api/video?id=${id}`)
    return res.json()
}

const show = el => el.classList.remove('d-none')

const showResolutions = resolutions => {
    const html = resolutions
        .map((resolution, i) => `
            <option name="resolution" value="${resolution}">${resolution}</option>
        `)
        .join('')
    
    resolutionsDiv.innerHTML = html
}

const getRadioValue = name =>
    document.querySelector(`[name="${name}"]:checked`).value

const getDownloadAnchor = ({id, resolution, format}) => {
    let url = `/download?id=${id}&format=${format}`
    
    if (format === 'video') {
        url += `&resolution=${resolution}`
    }

    const a = document.createElement('a')
    a.href = url
    a.download = true

    return a
}

const download = ({id, resolution, format}) => {
    const a = getDownloadAnchor({id, resolution, format})
    a.click()
}

startBtn.addEventListener(
  
    'click',
    async () => {
      const videoURL = videoURLInput.value.trim()
            if (videoURL.length == 0) {
                Swal.fire({
  title: 'Error!',
  text: 'Harap untuk memasukan URL!',
  icon: 'error',
  confirmButtonText: 'Oke'
})
            } 
      
        const id = getVideoID()
        const {title, resolutions, thumbnailURL} = await getVideoInfo(id)
        
        show(videoForamtsSection)
        
        
        videoTitleDiv.textContent = title
        videoThumbnailImg.src = thumbnailURL
        showResolutions(resolutions)
    }
)

downloadBtn.addEventListener(
    'click',
    () => {
        download({
            id: getVideoID(),
            resolution: getRadioValue('resolution'),
            format: getRadioValue('format')
        })
    }
)