import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, CheckCircle2, CreditCard, Info, Mail, Instagram, ArrowLeft, ZoomIn, UserCheck, Search, Wallet, FileText, Send, ClipboardList, Heart, MessageCircle, ExternalLink } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './registration-info.component.html',
  styleUrl: './registration-info.component.scss'
})
export class RegistrationInfoComponent implements OnInit {
  showZoom = false;

  readonly icons = {
    X,
    CheckCircle2,
    CreditCard,
    Info,
    Mail,
    Instagram,
    ArrowLeft,
    ZoomIn,
    UserCheck,
    Search,
    Wallet,
    FileText,
    Send,
    ClipboardList,
    Heart,
    MessageCircle,
    ExternalLink
  };

  instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=600&auto=format&fit=crop', // Mineral/Crystal
      likes: '142',
      comments: '18'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1474377202775-53b10113e91d?q=80&w=600&auto=format&fit=crop', // Mountain/Geology
      likes: '210',
      comments: '25'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop', // Field work/Hammer
      likes: '185',
      comments: '12'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=600&auto=format&fit=crop', // Compass/Map
      likes: '320',
      comments: '42'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1504221507732-5246c045949b?q=80&w=600&auto=format&fit=crop', // Rock formations
      likes: '128',
      comments: '9'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop', // Mountains
      likes: '245',
      comments: '15'
    }
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  toggleZoom() {
    this.showZoom = !this.showZoom;
    if (this.showZoom) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
