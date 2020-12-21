import React from 'react';
import styled from "styled-components";

export default function Footer() {
    return (
        <FooterWrapper>
            <footer class="site-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p class="text-justify">Rogphone is the phone ecommerce to help the customer buy products easily and efficiently. Rogphone focuses on providing the quality product etc. Apple, Samsung, Vsmart and other brands with best price.</p>
                            <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by 9th Group</p>
                        </div>
                        <div class="col-xs-6 col-md-3">
                            <h6>Technology</h6>
                            <ul class="footer-links">
                                <li><a href="https://firebase.google.com/">Firebase</a></li>
                                <li><a href="https://reactjs.org/">ReactJS</a></li>
                                <li><a href="https://getbootstrap.com/">Bootstrap 4</a></li>
                                <li><a href="https://ant.design/">Ant Design</a></li>
                            </ul>
                        </div>
                        <div class="col-xs-6 col-md-3">
                            <h6>Designed by</h6>
                            <ul class="footer-links">
                                <li><a href="http://scanfcode.com/about/">Đoàn Quốc Bảo</a></li>
                                <li><a href="http://scanfcode.com/contact/">Trần Mưa Phi Bảo</a></li>
                                <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Dương Sỹ Bình</a></li>
                                <li><a href="http://scanfcode.com/privacy-policy/">Trịnh Quang Duẫn</a></li>
                                <li><a href="http://scanfcode.com/sitemap/">Phạm Xuân Huy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-sm-6 col-xs-12">
                            <ul class="social-icons">
                                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a class="dribbble" href="#"><i class="fa fa-github"></i></a></li>
                                <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    .site-footer
    {
        background-color:white;
        padding: 35px 0 20px;
        font-size:15px;
        line-height:24px;
        color:#888;
    }

    .site-footer h6
    {
        color: #555;
        font-size:16px;
        text-transform:uppercase;
        margin-top:5px;
        letter-spacing:2px
    }

    .site-footer a
    {
        color:#888;
    }

    .site-footer a:hover
    {
        color:#3366cc;
        text-decoration:none;
    }
    .footer-links
    {
        padding-left:0;
        list-style:none
    }

    .footer-links li
    {
        display:block
    }

    .footer-links a
    {
        color:#888
    }

    .footer-links a:active,.footer-links a:focus,.footer-links a:hover
    {
        color:#3366cc;
        text-decoration:none;
    }

    .footer-links.inline li
    {
        display:inline-block
    }

    .site-footer .social-icons
    {
        text-align:center
    }

    .site-footer .social-icons a
    {
        width:40px;
        height:40px;
        line-height:40px;
        margin-left:6px;
        margin-right:0;
        border-radius:100%;
        background-color:#CCD8EA
    }

    .copyright-text
    {
        margin:0
    }
    
    @media (max-width:991px)
    {
        .site-footer [class^=col-]
        {
            margin-bottom:30px
        }
    }

    @media (max-width:767px)
    {
        .site-footer
        {
            padding-bottom:0
        }
        .site-footer .copyright-text,.site-footer .social-icons
        {   
            text-align:center
        }
    }

    .social-icons
    {
        padding-left:0;
        margin-bottom:0;
        list-style:none
    }

    .social-icons li
    {
        display:inline-block;
        margin-bottom:4px
    }

    .social-icons li.title
    {
        margin-right:15px;
        text-transform:uppercase;
        color:#96a2b2;
        font-weight:700;
        font-size:13px
    }

    .social-icons a{
        background-color:white;
        color:#818a91;
        font-size:16px;
        display:inline-block;
        line-height:44px;
        width:44px;
        height:44px;
        text-align:center;
        margin-right:8px;
        border-radius:100%;
        -webkit-transition:all .2s linear;
        -o-transition:all .2s linear;
        transition:all .2s linear
    }

    .social-icons a:active,.social-icons a:focus,.social-icons a:hover
    {
        color:#fff;
        background-color:#29aafe
    }

    .social-icons.size-sm a
    {
        line-height:34px;
        height:34px;
        width:34px;
        font-size:14px
    }

    .social-icons a.facebook:hover
    {
        background-color:#3b5998
    }

    .social-icons a.twitter:hover
    {
        background-color:#00aced
    }

    .social-icons a.linkedin:hover
    {
        background-color:#007bb6
    }

    .social-icons a.dribbble:hover
    {
        background-color: #333
    }

    @media (max-width:767px)
    {
        .social-icons li.title
        {
            display:block;
            margin-right:0;
            font-weight:600
        }
    }
`