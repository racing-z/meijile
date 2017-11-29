<template>
    <div>
        <div v-html="dataBut">
            {{dataBut}}
        </div>
        <div class="offic-head">
            <div class="logo">
                <img src='../../../../static/modulers/official/img/synthetica-logo.png'>
            </div>
            <div class="nav">
                <li><a class="underline">THE COLLECTIVE</a></li>
                <li><a class="underline">THE CREW</a></li>
                <li><a class="underline">ARTICLES</a></li>
                <li><a class="underline">FREEBIES</a></li>
            </div>
            <div class="search">
                <div class="underline">SUBSCRIBE</div>
                <Icon type="search"></Icon>
            </div>
        </div>
        <div class="offic-con">
            <div class="scroll-img">
                <Carousel autoplay v-model="value2" loop>
                    <CarouselItem>
                        <div style="background: url('../../../../static/modulers/official/img/hero-bg-01.jpg')" class="demo-carousel"></div>
                    </CarouselItem>
                    <CarouselItem>
                        <div style="background: url('../../../../static/modulers/official/img/hero-bg-02.jpg')" class="demo-carousel"></div>
                    </CarouselItem>
                    <CarouselItem>
                        <div style="background: url('../../../../static/modulers/official/img/hero-bg-03.jpg')" class="demo-carousel"></div>
                    </CarouselItem>
                </Carousel>
                <div class="bg-hover" v-observe-visibility="visibilityChanged">
                    <div class="">Download Synthetica today, it's free forever.</div>
                    <Button size="large" type="primary">DOWNLOAD TEMPLATE</Button>
                    <p>Available exclusively from Codrops.</p>
                    <Icon type="mouse"></Icon>
                </div>
            </div>
            <div class="video-head">
                <div class="head">
                    <h4>THE COLLECTIVE</h4>
                </div>
                <div class="text">
                    8-bit aesthetic kitsch 90's humblebrag. Gastropub tacos hoodie letterpress, banjo normcore trust fund hella. Kinfolk gluten-free lo-fi quinoa. Pabst kitsch ennui hoodie meggings banjo. Schlitz tacos kitsch godard before they sold out. Kale chips chillwave
                    kickstarter photo booth cronut cold-pressed. Banjo fixie umami kombucha affogato gluten-free authentic slow-carb hashtag, hammock pour-over chambray viral VHS normcore.
                </div>
            </div>
            <div class="video-con">
                <div>
                    <video id="video_synth" class="video-js vjs-default-skin vjs-big-play-centered" controls="" preload="auto" width="568" height="300" poster="../../../../static/modulers/official/img/video-cover.jpg" data-setup="{}">
                                				    <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
                                				    <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
                                				    <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
                                				    <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                                			    </video>
                </div>
            </div>
            <div class="video-foot">
                <p>8-bit aesthetic kitsch 90's humblebrag. Gastropub tacos hoodie letterpress, banjo normcore trust fund hella. Kinfolk gluten-free lo-fi quinoa. </p>
                <p>
                    Pabst kitsch ennui hoodie meggings banjo. Schlitz tacos kitsch godard before they sold out. Kale chips chillwave kickstarter photo booth cronut cold-pressed. Banjo fixie umami kombucha affogato gluten-free authentic slow-carb hashtag, hammock pour-over
                    chambray viral VHS normcore.
                </p>
            </div>
            <!-- crow -->
            <div class="crew">
                <div class="crew-head">
                    <h4>THE CREW</h4>
                </div>
                <div class="crew-con">
                    <div class="img" style="background: url('../../../../static/modulers/official/img/crew-peter-finlan.jpg') no-repeat">
                        <div class="hover">
                            <h2>Peter Finlan</h2>
                            <p>8-bit aesthetic kitsch 90's humblebrag. Gastropub tacos hoodie letterpress.</p>
                        </div>
                    </div>
                    <div class="img" style="background: url('../../../../static/modulers/official/img/crew-blaz-robar.jpg') no-repeat">
                        <div class="hover">
                            <h2>Peter Finlan</h2>
                            <p>8-bit aesthetic kitsch 90's humblebrag. Gastropub tacos hoodie letterpress.</p>
                        </div>
                    </div>
                    <div class="img" style="background: url('../../../../static/modulers/official/img/crew-dude.jpg') no-repeat">
                        <div class="hover">
                            <h2>Peter Finlan</h2>
                            <p>8-bit aesthetic kitsch 90's humblebrag. Gastropub tacos hoodie letterpress.</p>
                        </div>
                    </div>
                    <div class="img" style="background: url('../../../../static/modulers/official/img/crew-mary-lou.jpg') no-repeat">
                        <div class="hover">
                            <h2>Peter Finlan</h2>
                            <p>8-bit aesthetic kitsch 90's humblebrag. Gastropub tacos hoodie letterpress.</p>
                        </div>
                    </div>
                </div>
                <div class="crew-process">
                    <div class="process-item">
                        <div class="label">asd</div>
                        <Progress :percent="90" status="active"></Progress>
                    </div>
                    <div class="process-item">
                        <div class="label">asd</div>
                        <Progress :percent="95" status="active"></Progress>
                    </div>
                    <div class="process-item">
                        <div class="label">asd</div>
                        <Progress :percent="85" status="active"></Progress>
                    </div>
                    <div class="process-item">
                        <div class="label">asd</div>
                        <Progress :percent="95" status="active"></Progress>
                    </div>
                </div>
                <!-- stats -->
                <div class="stats">
                    <div class="stats-bg" style="background:url('../../../../static/modulers/official/img/stats-bg.jpg') no-repeat">
                        <div class="stats-row">
                            <div class="stats-item">
                                <Icon type="trophy"></Icon>
                                <div class="stats-label">
                                    <div>100</div>
                                    <p>AWARDS WON</p>
                                </div>
                            </div>
                            <div class="stats-item">
                                <Icon type="ios-book-outline"></Icon>
                                <div class="stats-label">
                                    <div>100</div>
                                    <p>AWARDS WON</p>
                                </div>
                            </div>
                            <div class="stats-item">
                                <Icon type="ios-color-wand-outline"></Icon>
                                <div class="stats-label">
                                    <div>100</div>
                                    <p>AWARDS WON</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- latest -->
            <div class="latest">
                <div class="latest-head">
                    <h4>LATEST ARTICLES</h4>
                </div>
                <div class='latest-con'>
                    <div class="latest-item">
                        <img src='../../../../static/modulers/official/img/article-01.jpg'>
                        <h2>8 solid tips when working with front-end developers</h2>
                        <p>A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus...</p>
                        <div class="foot">
                            <span>Product</span>
                            <span>
                                    <Icon type="chatbubbles"></Icon>
                                </span>
                        </div>
                    </div>
                    <div class="latest-item">
                        <img src='../../../../static/modulers/official/img/article-02.jpg'>
                        <h2>8 solid tips when working with front-end developers</h2>
                        <p>A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus...</p>
                        <div class="foot">
                            <span>Product</span>
                            <span>
                                    <Icon type="chatbubbles"></Icon>
                                </span>
                        </div>
                    </div>
                    <div class="latest-item">
                        <img src='../../../../static/modulers/official/img/article-03.jpg'>
                        <h2>8 solid tips when working with front-end developers</h2>
                        <p>A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus...</p>
                        <div class="foot">
                            <span>Product</span>
                            <span>
                                    <Icon type="chatbubbles"></Icon>
                                </span>
                        </div>
                    </div>
                    <div class="latest-item">
                        <img src='../../../../static/modulers/official/img/article-04.jpg'>
                        <h2>8 solid tips when working with front-end developers</h2>
                        <p>A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus...</p>
                        <div class="foot">
                            <span>Product</span>
                            <span>
                                    <Icon type="chatbubbles"></Icon>
                                </span>
                        </div>
                    </div>
                    <div class="latest-item">
                        <img src='../../../../static/modulers/official/img/article-05.jpg'>
                        <h2>8 solid tips when working with front-end developers</h2>
                        <p>A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus...</p>
                        <div class="foot">
                            <span>Product</span>
                            <span>
                                    <Icon type="chatbubbles"></Icon>
                                </span>
                        </div>
                    </div>
                    <div class="latest-item">
                        <img src='../../../../static/modulers/official/img/article-06.jpg'>
                        <h2>8 solid tips when working with front-end developers</h2>
                        <p>A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus...</p>
                        <div class="foot">
                            <span>Product</span>
                            <span>
                                    <Icon type="chatbubbles"></Icon>
                                </span>
                        </div>
                    </div>
                    <Button class="view-more">VIEW MORE</Button>
                </div>
            </div>
            <!-- freebies  -->
            <div class="freebies">
                <div class="freebies-head">
                    <h4>FRESHEST FREEBIES</h4>
                </div>
                <div class="freebies-word">
                    <div class="freebies-word-item">
                        <p>
                            A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus cursus ut parturient viverra elit aliquam ultrices est sem. Tellus nam ad fermentum ac enim est duis facilisis congue a lacus adipiscing consequat
                            risus consectetur scelerisque integer suspendisse a mus integer elit.
                        </p>
                    </div>
                    <div class="freebies-word-item">
                        <p>
                            A posuere donec senectus suspendisse bibendum magna ridiculus a justo orci parturient suspendisse ad rhoncus cursus ut parturient viverra elit aliquam ultrices est sem. Tellus nam ad fermentum ac enim est duis facilisis congue a lacus adipiscing consequat
                            risus consectetur scelerisque integer suspendisse a mus integer elit.
                        </p>
                    </div>
                </div>
                <div class="freebies-img">
                    <div class="freebies-img-item" style="background: url('../../../../static/modulers/official/img/sedna-freebie.jpg') no-repeat;">
                        <div class="hover">
                            <div class="date">2017/11/11</div>
                            <div class="sing">SEDNA HTML CSS TEMPLATE</div>
                            <Button class="download">DOWNLOAD</Button>
                        </div>
                    </div>
                    <div class="freebies-img-item" style="background: url('../../../../static/modulers/official/img/landio-freebie.jpg') no-repeat;">
                        <div class="hover">
                            <div class="date">2017/11/11</div>
                            <div class="sing">SEDNA HTML CSS TEMPLATE</div>
                            <Button class="download">DOWNLOAD</Button>
                        </div>
                    </div>
                    <div class="freebies-img-item" style="background: url('../../../../static/modulers/official/img/landio-freebie.jpg') no-repeat;">
                        <div class="hover">
                            <div class="date">2017/11/11</div>
                            <div class="sing">SEDNA HTML CSS TEMPLATE</div>
                            <Button class="download">DOWNLOAD</Button>
                        </div>
                    </div>
                    <div class="freebies-img-item" style="background: url('../../../../static/modulers/official/img/landio-freebie.jpg') no-repeat;">
                        <div class="hover">
                            <div class="date">2017/11/11</div>
                            <div class="sing">SEDNA HTML CSS TEMPLATE</div>
                            <Button class="download">DOWNLOAD</Button>
                        </div>
                    </div>
                </div>
                <div class="view-more">
                    <Button>VIEW MORE</Button>
                </div>
            </div>


            <!-- get start -->
            <div class="get-start">
                <p>Get started now. Download Synthetica FREE, via Codrops.</p>
                <Button>GET STARTED</Button>
            </div>

        </div>
    </div>
</template>
<script>
    import './official.sass'
    export default {
        data () {
            return {
                value2: 1,
                dataBut: '<button>aaa</button>'
            }
        },
        methods: {
            visibilityChanged (isVisible, entrye, customArgument) {
                console.log(isVisible)
                console.log(entrye)
                console.log(customArgument)
                entrye.target.className = entrye.target.className + ' fadein-buttom-to-top'
            }
        }
    }
</script>