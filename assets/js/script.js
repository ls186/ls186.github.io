// 初始化 AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
});

// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

function toggleMenu() {
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // 重置菜单项动画
    const menuItems = navLinks.querySelectorAll('li');
    menuItems.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight; // 触发重排
        item.style.animation = null;
    });
}

menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// 点击菜单项时关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// 阻止菜单内部点击事件冒泡
navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 点击页面其他区域关闭菜单
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// 保护信息点击处理
document.querySelectorAll('.protected-info').forEach(info => {
    info.addEventListener('click', function() {
        const fullInfo = this.getAttribute('data-info');
        const currentText = this.textContent;
        
        // 切换显示完整信息和保护信息
        if (this.textContent === fullInfo) {
            this.textContent = this.textContent.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        } else {
            this.textContent = fullInfo;
            // 3秒后自动隐藏
            setTimeout(() => {
                this.textContent = currentText;
            }, 3000);
        }
    });
});

// 初始化 EmailJS
(function() {
    emailjs.init("0WgNurOwnRMcBXrCx"); // 替换为你的 EmailJS public key
})();

// 表单提交处理
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const formMessage = document.createElement('div');
    formMessage.className = 'form-message';
    this.appendChild(formMessage);

    // 添加加载状态
    submitBtn.classList.add('loading');
    
    // 准备发送的数据
    const templateParams = {
        from_name: this.user_name.value,
        from_email: this.user_email.value,
        message: this.message.value,
        to_name: '磊辰洋科技', // 收件人名称
    };

    // 发送邮件
    emailjs.send('service_vj0xkvl', 'template_aebagcg', templateParams)
        .then(function() {
            formMessage.textContent = '消息已发送，我们会尽快与您联系！';
            formMessage.className = 'form-message success';
            event.target.reset(); // 清空表单
        }, function(error) {
            formMessage.textContent = '发送失败，请稍后重试或直接联系我们。';
            formMessage.className = 'form-message error';
            console.error('发送失败:', error);
        })
        .finally(function() {
            submitBtn.classList.remove('loading');
            // 3秒后移除提示消息
            setTimeout(() => {
                formMessage.remove();
            }, 3000);
        });
});

// 更新语言配置对象
const translations = {
    zh: {
        // 导航
        nav_home: "首页",
        nav_services: "服务",
        nav_cases: "案例",
        nav_tech: "技术能力",
        nav_contact: "联系我们",

        // Hero部分
        title: "磊辰洋科技",
        hero_subtitle: "专业的技术服务，助力企业数字化转型",
        cta_button: "免费咨询",

        // 服务部分
        services_title: "我们的服务",
        web_dev_title: "Web开发",
        web_dev_desc: "提供响应式网站开发、企业管理系统、电商平台等专业web应用开发服务",
        mobile_dev_title: "移动应用开发",
        mobile_dev_desc: "iOS和Android原生应用开发，Flutter跨平台解决方案，确保最佳用户体验",
        cloud_title: "云服务",
        cloud_desc: "提供云架构设计、部署和运维服务，助力企业实现数字化转型",
        desktop_title: "桌面应用开发",
        desktop_desc: "基于Electron、Qt等框架的跨平台桌面应用开发，满足企业定制化需求",
        ai_title: "人工智能应用",
        ai_desc: "AI算法集成、机器学习模型部署，为企业提供智能化解决方案",
        security_title: "网络安全服务",
        security_desc: "应用安全测试、漏洞扫描、安全加固，保障企业系统安全",
        learn_more: "了解更多",

        // 案例部分
        cases_title: "成功案例",
        case1_title: "平台开发",
        case1_desc: "为某知名品牌开发的全渠道电商平台、企业管理系统、POS系统等",
        case2_title: "数字化管理系统",
        case2_desc: "大型企事业单位内部管理系统开发与部署",

        // 技术能力部分
        tech_title: "技术能力",
        frontend_title: "前端技术",
        backend_title: "后端技术",
        dev_process: "开发流程",
        requirement_title: "需求分析",
        requirement_desc: "深入理解客户需求，制定解决方案",
        agile_title: "敏捷开发",
        agile_desc: "采用敏捷方法，快速迭代",
        qa_title: "质量保证",
        qa_desc: "严格的测试和代码审查",

        // 联系我们部分
        contact_title: "联系我们",
        address_title: "地址",
        address: "成都市高新区",
        phone_title: "电话",
        email_title: "邮箱",
        form_name: "您的姓名",
        form_email: "您的邮箱",
        form_message: "您的需求",
        send_message: "发送信息",
        success_message: "消息已发送，我们会尽快与您联系！",
        error_message: "发送失败，请稍后重试或直接联系我们。",

        // 页脚部分
        about_us_title: "关于我们",
        about_us_desc: "成都磊辰洋科技有限公司专注于提供高质量的技术解决方案，助力企业数字化转型",
        copyright: "© 2012-2025 成都磊辰洋科技有限公司. 保留所有权利"
    },
    en: {
        // Navigation
        nav_home: "Home",
        nav_services: "Services",
        nav_cases: "Cases",
        nav_tech: "Technology",
        nav_contact: "Contact",

        // Hero section
        title: "LeiChenYang Technology",
        hero_subtitle: "Professional Technical Services for Enterprise Digital Transformation",
        cta_button: "Free Consultation",

        // Services section
        services_title: "Our Services",
        web_dev_title: "Web Development",
        web_dev_desc: "Professional web application development including responsive websites, enterprise management systems, and e-commerce platforms",
        mobile_dev_title: "Mobile App Development",
        mobile_dev_desc: "Native iOS and Android development, Flutter cross-platform solutions for optimal user experience",
        cloud_title: "Cloud Services",
        cloud_desc: "Cloud architecture design, deployment, and maintenance services for digital transformation",
        desktop_title: "Desktop Application",
        desktop_desc: "Cross-platform desktop applications based on Electron, Qt frameworks for customized enterprise needs",
        ai_title: "AI Applications",
        ai_desc: "AI algorithm integration and machine learning model deployment for intelligent solutions",
        security_title: "Network Security",
        security_desc: "Application security testing, vulnerability scanning, and security reinforcement",
        learn_more: "Learn More",

        // Cases section
        cases_title: "Success Cases",
        case1_title: "Platform Development",
        case1_desc: "Omni-channel e-commerce platform, enterprise management system, and POS system for a well-known brand",
        case2_title: "Digital Management System",
        case2_desc: "Internal management system development and deployment for large enterprises",

        // Technology section
        tech_title: "Technical Capabilities",
        frontend_title: "Frontend Technologies",
        backend_title: "Backend Technologies",
        dev_process: "Development Process",
        requirement_title: "Requirement Analysis",
        requirement_desc: "Deep understanding of client needs and solution planning",
        agile_title: "Agile Development",
        agile_desc: "Agile methodology for rapid iteration",
        qa_title: "Quality Assurance",
        qa_desc: "Strict testing and code review",

        // Contact section
        contact_title: "Contact Us",
        address_title: "Address",
        address: "Chengdu Hi-tech Zone",
        phone_title: "Phone",
        email_title: "Email",
        form_name: "Your Name",
        form_email: "Your Email",
        form_message: "Your Message",
        send_message: "Send Message",
        success_message: "Message sent! We'll contact you soon.",
        error_message: "Failed to send. Please try again or contact us directly.",

        // Footer section
        about_us_title: "About Us",
        about_us_desc: "Chengdu LeiChenYang Technology Co., Ltd. focuses on providing high-quality technical solutions for enterprise digital transformation",
        copyright: "© 2012-2025 Chengdu LeiChenYang Technology Co., Ltd. All rights reserved"
    }
};

// 切换语言的函数
function switchLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    
    // 更新语言切换按钮状态
    const langSwitch = document.querySelector('.language-switch');
    langSwitch.setAttribute('data-active', lang);
    
    // 更新按钮激活状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if ((lang === 'zh' && btn.textContent === '中文') ||
            (lang === 'en' && btn.textContent === 'EN')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 更新页面上的文本
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 更新表单占位符
    document.querySelector('input[name="user_name"]').placeholder = translations[lang].form_name;
    document.querySelector('input[name="user_email"]').placeholder = translations[lang].form_email;
    document.querySelector('textarea[name="message"]').placeholder = translations[lang].form_message;
    
    // 更新按钮文本
    document.querySelector('.submit-btn .btn-text').textContent = translations[lang].send_message;
    
    // 更新 HTML lang 属性
    document.documentElement.lang = lang;
}

// 页面加载时初始化语言和按钮状态
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    switchLanguage(savedLang);
    
    // 初始化按钮状态
    const langSwitch = document.querySelector('.language-switch');
    langSwitch.setAttribute('data-active', savedLang);
    
    // 修复按钮选择器
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if ((savedLang === 'zh' && btn.textContent === '中') ||
            (savedLang === 'en' && btn.textContent === 'EN')) {
            btn.classList.add('active');
        }
    });
}); 