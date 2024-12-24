import React from 'react';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Just shipped v1.0</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Professional websites for small businesses
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Launch your business online in minutes with our free website builder. No technical skills required.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg">
              Get started for free
            </Button>
            <Button variant="outline" size="lg">
              View templates
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { icon: Globe, text: 'Free subdomain hosting' },
              { icon: Shield, text: 'SSL security included' },
              { icon: Zap, text: 'Lightning-fast CDN' },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <feature.icon className="h-6 w-6 text-blue-600" />
                <p className="mt-2 text-sm text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop"
              alt="App screenshot"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}